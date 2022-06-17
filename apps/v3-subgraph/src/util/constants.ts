import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';

export namespace constants {
  export const BIGINT_ZERO = BigInt.fromI32(0);
  export const BIGINT_ONE = BigInt.fromI32(1);
  export const BIGDECIMAL_ZERO = new BigDecimal(constants.BIGINT_ZERO);
  export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
  export const BYTES32_ZERO =
    '0x0000000000000000000000000000000000000000000000000000000000000000';
  //daohaus.summoner.daoProfile
  export const DAOHAUS_SUMMONER_DAO_PROFILE_TAG =
    'e4b3c9ca24549b09f0fc8b5990e2d031e7f2b080ecca7cb4b5886c5c97cb3235';
  //daohaus.shares.daoProfile
  export const DAOHAUS_SHARES_DAO_PROFILE_TAG =
    '7983ed9a7b186e99a3013717a3415e68a645a683afa103a308be273625b7f9d9';
}
