export const INFO_COPY = {
  VOTING_STK:
    "The voting stake token name is set when the DAO is summoned. What does your community want to name the DAO's token?",
  TOKEN_SYMBOL:
    'This is the common shorthand your DAO will use to refer to voting stake among DAO members. What abbreviated symbol would your DAO like to use here?',
  STAKE_TRANSFER:
    'Should DAO members be allowed to transfer their voting stake to other accounts? After summoning, the DAO can change this with a proposal.',
  NV_STAKE_TRANSFER:
    'Should DAO members be allowed to transfer their non-voting stake to other accounts? After summoning, the DAO can change this with a proposal.',
  VOTING_PERIOD:
    'The length of time a proposal will remain open for voting stake members to submit votes.',
  GRACE_PERIOD:
    'The time period between a proposal’s approval and its execution. This provides time for members to ragequit their shares, before the approved proposal is executed.',
  QUORUM:
    'The minimum percentage of DAO members (voting stake) needed to approve a proposal for it to be executed. This percentage can greatly affect DAO operations. After summoning, the DAO can change it with a proposal.',
  MIN_RETENTION:
    'If less than this percentage of DAO members (voting and non-voting stake) remain in the DAO after the Grace period for a given proposal, that proposal will not be executed.',
  SPONSOR_THRESHOLD:
    'The minimum number of voting stake tokens that a member needs to sponsor a proposal.',
  NEW_OFFERING:
    'Intended to protect against spam issues, this is the fee required to submit a DAO proposal. Fees go into the DAO treasury.',
  SHAMAN:
    'Input shaman list with contract address and permission level per row using spaces. ex: \n0x00000000000000 2 \n0x00000000000000 1.',
  MEMBERS:
    'Input member list with member address, voting stake amount, and non-voting stake amount per row using spaces. ex: \n 0x00000000000000 20 10 \n 0x00000000000000 10 20',
};
