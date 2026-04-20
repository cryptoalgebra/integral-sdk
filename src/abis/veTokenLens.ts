export const veTokenLensABI = [
  {
    inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
    name: 'getVotesFromAddress',
    outputs: [
      {
        components: [
          { internalType: 'bool', name: 'voted', type: 'bool' },
          { internalType: 'uint256', name: 'votingPower', type: 'uint256' },
          { internalType: 'uint256', name: 'earningPower', type: 'uint256' },
          { internalType: 'uint256', name: 'epochVotes', type: 'uint256' },
          { internalType: 'uint256', name: 'nextEpochVotes', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'nextEarningPower',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'voteTs', type: 'uint256' },
          {
            components: [
              { internalType: 'address', name: 'pair', type: 'address' },
              { internalType: 'uint256', name: 'weight', type: 'uint256' },
            ],
            internalType: 'struct veNFTAPIHydrex.pairVotes[]',
            name: 'votes',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct veNFTAPIHydrex.Votes',
        name: 'votesResult',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'address', name: '_pair', type: 'address' },
    ],
    name: 'singlePairReward',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'uint8', name: 'decimals', type: 'uint8' },
          { internalType: 'address', name: 'pair', type: 'address' },
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'address', name: 'fee', type: 'address' },
          { internalType: 'address', name: 'bribe', type: 'address' },
          { internalType: 'string', name: 'symbol', type: 'string' },
        ],
        internalType: 'struct veNFTAPIHydrex.Reward[]',
        name: '_reward',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
