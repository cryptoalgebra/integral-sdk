import { Interface } from '@ethersproject/abi';
import { formatUnits } from '@ethersproject/units';
import { veTokenLensABI } from '../abis/veTokenLens';
import { ADDRESS_ZERO } from '../constants/constants';
import { BigintIsh } from '../types/BigIntish';
import {
  ReadContractFunction,
  ReadContractsFunction,
} from '../types/contractReads';
import { toBigInt } from '../utils/toBigInt';
import { validateAndParseAddress } from '../utils/validateAndParseAddress';
import { BribeClaimItem, FeeClaimItem } from './veNFTClaims';

export interface VeTokenLensReward {
  id: bigint;
  amount: bigint;
  decimals: number;
  pair: string;
  token: string;
  fee: string;
  bribe: string;
  symbol: string;
}

export interface VeNFTClaimable {
  fees: FeeClaimItem[];
  bribes: BribeClaimItem[];
}

export interface SnapshotVote {
  pair: string;
  weight: bigint;
  weightFormatted: string;
  percent: number;
}

export interface UserVoteSnapshot {
  voted: boolean;
  votingPower: string;
  rawVotingPower: bigint;
  earningPower: string;
  rawEarningPower: bigint;
  epochVotes: string;
  rawEpochVotes: bigint;
  nextEpochVotes: string;
  rawNextEpochVotes: bigint;
  nextEarningPower: string;
  rawNextEarningPower: bigint;
  voteTs: number;
  rawVoteTs: bigint;
  votes: SnapshotVote[];
}

/**
 * Helpers for reading veNFT reward state from the VeTokenLens contract.
 *
 * Use these helpers when you need to discover which fee or bribe claims are
 * available for a veNFT before building claim transactions with VeNFTClaims.
 */
export abstract class VeNFTLens {
  public static INTERFACE: Interface = new Interface(
    veTokenLensABI as unknown as any[],
  );

  private constructor() {}

  /**
   * Reads the reward entries for a single voted pair from VeTokenLens.
   *
   * Use this when you already know the pair you want to inspect and need the
   * raw fee/bribe reward entries tied to that pair.
   *
   * @param tokenId veNFT token id to inspect
   * @param pairAddress pair or strategy address to query
   * @param readContract injected read function bound to the VeTokenLens contract
   */
  public static async getSinglePairReward(
    tokenId: BigintIsh,
    pairAddress: string,
    readContract: ReadContractFunction,
  ): Promise<VeTokenLensReward[]> {
    const normalizedPairAddress = validateAndParseAddress(pairAddress);
    const result = await readContract<unknown[]>({
      functionName: 'singlePairReward',
      args: [toBigInt(tokenId), normalizedPairAddress],
    });

    return (result ?? []).map(reward => VeNFTLens.parseReward(reward));
  }

  /**
   * Reads and classifies all claimable rewards for a veNFT across multiple
   * voted pairs.
   *
   * The returned fee and bribe items are already shaped to pass directly into
   * VeNFTClaims claim builders.
   *
   * @param tokenId veNFT token id to inspect
   * @param pairAddresses voted pair or strategy addresses to query
   * @param readContracts injected batch read function bound to VeTokenLens
   */
  public static async getAllClaimable(
    tokenId: BigintIsh,
    pairAddresses: string[],
    readContracts: ReadContractsFunction,
  ): Promise<VeNFTClaimable> {
    if (pairAddresses.length === 0) {
      return { fees: [], bribes: [] };
    }

    const normalizedTokenId = toBigInt(tokenId);
    const normalizedPairAddresses = pairAddresses.map(address =>
      validateAndParseAddress(address),
    );

    const results = await readContracts(
      normalizedPairAddresses.map(pairAddress => ({
        functionName: 'singlePairReward',
        args: [normalizedTokenId, pairAddress],
      })),
    );

    const fees = new Map<string, Set<string>>();
    const bribes = new Map<string, Set<string>>();

    results.forEach(result => {
      const rewards = Array.isArray(result) ? result : [];

      rewards.forEach(rewardResult => {
        const reward = VeNFTLens.parseReward(rewardResult);

        if (reward.amount <= BigInt(0)) {
          return;
        }

        if (reward.bribe !== ADDRESS_ZERO) {
          VeNFTLens.appendClaim(bribes, reward.bribe, reward.token);
          return;
        }

        if (reward.fee !== ADDRESS_ZERO) {
          VeNFTLens.appendClaim(fees, reward.fee, reward.token);
        }
      });
    });

    return {
      fees: Array.from(fees.entries()).map(([feeAddress, tokens]) => ({
        feeAddress,
        tokens: Array.from(tokens),
      })),
      bribes: Array.from(bribes.entries()).map(([bribeAddress, tokens]) => ({
        bribeAddress,
        tokens: Array.from(tokens),
      })),
    };
  }

  /**
   * Reads the current vote snapshot for a user directly from VeTokenLens.
   *
   * This richer snapshot should be preferred when the caller needs the user's
   * current saved votes, vote timestamp, and epoch-level voting totals in one read.
   *
   * @param owner wallet address to inspect
   * @param readContract injected read function bound to the VeTokenLens contract
   */
  public static async getUserVoteSnapshot(
    owner: string,
    readContract: ReadContractFunction,
  ): Promise<UserVoteSnapshot> {
    const result = await readContract({
      functionName: 'getVotesFromAddress',
      args: [validateAndParseAddress(owner)],
    });

    return VeNFTLens.parseUserVoteSnapshot(result);
  }

  /**
   * Normalizes a raw VeTokenLens reward entry into the SDK reward shape.
   */
  private static parseReward(reward: unknown): VeTokenLensReward {
    const rawReward = reward as {
      id: unknown;
      amount: unknown;
      decimals: unknown;
      pair: unknown;
      token: unknown;
      fee: unknown;
      bribe: unknown;
      symbol: unknown;
    };

    return {
      id: toBigInt(rawReward.id),
      amount: toBigInt(rawReward.amount),
      decimals: Number(rawReward.decimals),
      pair: validateAndParseAddress(String(rawReward.pair)),
      token: validateAndParseAddress(String(rawReward.token)),
      fee: validateAndParseAddress(String(rawReward.fee)),
      bribe: validateAndParseAddress(String(rawReward.bribe)),
      symbol: String(rawReward.symbol),
    };
  }

  /**
   * Normalizes a raw VeTokenLens vote snapshot into the SDK vote snapshot shape.
   */
  private static parseUserVoteSnapshot(result: unknown): UserVoteSnapshot {
    const rawResult = result as {
      voted: unknown;
      votingPower: unknown;
      earningPower: unknown;
      epochVotes: unknown;
      nextEpochVotes: unknown;
      nextEarningPower: unknown;
      voteTs: unknown;
      votes: unknown;
    };
    const rawVotingPower = toBigInt(rawResult.votingPower);
    const rawEarningPower = toBigInt(rawResult.earningPower);
    const rawEpochVotes = toBigInt(rawResult.epochVotes);
    const rawNextEpochVotes = toBigInt(rawResult.nextEpochVotes);
    const rawNextEarningPower = toBigInt(rawResult.nextEarningPower);
    const rawVoteTs = toBigInt(rawResult.voteTs);
    const parsedVotes = Array.isArray(rawResult.votes)
      ? rawResult.votes.map(vote => VeNFTLens.parseSnapshotVote(vote))
      : [];
    const totalVoteWeight = parsedVotes.reduce(
      (sum, vote) => sum + vote.weight,
      BigInt(0),
    );

    return {
      voted: Boolean(rawResult.voted) && parsedVotes.length > 0,
      votingPower: formatUnits(rawVotingPower, 18),
      rawVotingPower,
      earningPower: formatUnits(rawEarningPower, 18),
      rawEarningPower,
      epochVotes: formatUnits(rawEpochVotes, 18),
      rawEpochVotes,
      nextEpochVotes: formatUnits(rawNextEpochVotes, 18),
      rawNextEpochVotes,
      nextEarningPower: formatUnits(rawNextEarningPower, 18),
      rawNextEarningPower,
      voteTs: Number(rawVoteTs),
      rawVoteTs,
      votes: parsedVotes.map(vote => ({
        ...vote,
        percent:
          totalVoteWeight > BigInt(0)
            ? Math.round(
                (Number(vote.weight) / Number(totalVoteWeight)) * 10000,
              ) / 100
            : 0,
      })),
    };
  }

  /**
   * Normalizes a raw vote row from VeTokenLens into the SDK vote row shape.
   */
  private static parseSnapshotVote(vote: unknown): SnapshotVote {
    const rawVote = vote as {
      pair: unknown;
      weight: unknown;
    };
    const weight = toBigInt(rawVote.weight);

    return {
      pair: validateAndParseAddress(String(rawVote.pair)),
      weight,
      weightFormatted: formatUnits(weight, 18),
      percent: 0,
    };
  }

  /**
   * Adds a token to an aggregated claim entry while preserving discovery order.
   */
  private static appendClaim(
    claims: Map<string, Set<string>>,
    sourceAddress: string,
    tokenAddress: string,
  ): void {
    const existing = claims.get(sourceAddress);

    if (existing) {
      existing.add(tokenAddress);
      return;
    }

    claims.set(sourceAddress, new Set([tokenAddress]));
  }
}
