// const ADMIN_CONFIG = {
//   CONTRACT: LOCAL_ABI.BAAL,
//   ACTION: 'setAdminConfig',
//   ARGS: {
//     PAUSE_SHARES: 'true',
//     PAUSE_LOOT: 'true',
//   },
// };
// const GOVERNANCE_CONFIG = {
//   CONTRACT: LOCAL_ABI.BAAL,
//   ACTION: 'setGovernanceConfig',
//   ARGS: [
//     defaultEncode(
//       ['uint32', 'uint32', 'uint256', 'uint256', 'uint256', 'uint256'],
//       Object.values({
//         VOTING_IN_SECONDS: 120,
//         GRACE_IN_SECONDS: 60,
//         PROPOSAL_OFFERING: 0,
//         QUORUM_PERCENT: 0,
//         SPONSOR_THRESHOLD: 2,
//         MINIMUM_RETENTION_PERCENT: 66,
//       })
//     ),
//   ],
// };
// const SHAMAN_CONFIG = {
//   CONTRACT: LOCAL_ABI.BAAL,
//   ACTION: 'setShamans',
//   ARGS: {
//     SHAMANS: [], //array of addresses
//     PERMISSIONS: [], //array of numbers
//   },
// };
// const SHARES_CONFIG = {
//   CONTRACT: LOCAL_ABI.BAAL,
//   ACTION: 'mintShares',
//   ARGS: {
//     TO: [TEST.JORD], //address array
//     AMOUNT: ['40'], //number array
//   },
// };
// const LOOT_CONFIG = {
//   CONTRACT: LOCAL_ABI.BAAL,
//   ACTION: 'mintLoot',
//   ARGS: {
//     TO: [TEST.JORD], //address array
//     AMOUNT: ['100'], //number array
//   },
// };

// const METADATA = safeEncodeHexFunction(
//   LOCAL_ABI.POSTER,
//   'post',
//   Object.values({
//     JSON: JSON.stringify({ name: 'Salty Nonce DAO' }),
//     TAG: 'daohaus.metadata.summoner',
//   })
// );
// const METADATA_CONFIG = {
//   CONTRACT: LOCAL_ABI.BAAL,
//   ACTION: 'executeAsBaal',
//   ARGS: {
//     TO: CONTRACT_ADDRESSES.POSTER['0x4'],
//     VALUE: 0,
//     DATA: METADATA,
//   },
// };
export const poop = 1;
