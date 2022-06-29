export const FORM_COPY = {
  TOKENS: {
    title: 'Stake Tokens',
    description:
      'The Stake tokens represent voting and economic stake within the DAO.',
  },
  TIMING: {
    title: 'Proposal Timing',
    description:
      'Define your timing for Voting and Grace periods. You can update these settings through a proposal.',
  },
  ADVANCED: {
    title: 'Advanced Governance',
    description: 'Modify some advanced governance features.',
  },
  SHAMANS: {
    title: 'Starting Shamans',
    description:
      'Shamans are very powerful as they can have administrative control over voting and non-voting stakes. Be very careful adding shamans.',
  },
  MEMBERS: {
    title: 'Starting Members',
    description:
      'You must have at least one member to start. Add other starting members as desired. You can always add more members later through a proposal or a shaman.',
  },
};
export const INFO_COPY = {
  VOTING_STK:
    "Voting stake tokens are created when the DAO is summoned. What does your community want to name the DAO's token?",
  TOKEN_SYMBOL:
    'This is the common shorthand referring to stake among DAO members.  What abbreviated symbol would your DAO like to use here?',
  STAKE_TRANSFER:
    'Allow or disallow the voting stake tokens to be transferable between addresses.',
  NV_STAKE_TRANSFER:
    'Allow or disallow the non-voting stake tokens to be transferable between addresses',
  VOTING_PERIOD:
    'The length of time a proposal will remain available for voting stake members to submit their vote',
  GRACE_PERIOD:
    'The time period between a proposal’s approval and its execution.  This provides time for members to ragequit their shares, before the approved proposal is executed.',
  QUORUM:
    'The minimum percentage of DAO members needed to approve a proposal for it to execute.  This percentage can greatly affect DAO operations',
  MIN_RETENTION:
    'Used as a safety measure, this is the minimum percentage of DAO members needed to ragequit for a proposal to automatically fail',
  SPONSOR_THRESHOLD:
    'The minimum amount of voting stake that a member needs to have their proposal automatically sponsored upon creation.',
  NEW_OFFERING:
    'Intended to protect against spam issues, this is the fee required to submit a DAO proposal.',
  SHAMAN:
    'Input shaman list with contract address and permission level per row using spaces. ex: \n0x00000000000000 2 \n0x00000000000000 1',
  MEMBERS:
    'Input member list with member address, voting stake amount, and non-voting stake amount per row. ex: \n 0x00000000000000 20 10 \n 0x00000000000000 10 20',
};
