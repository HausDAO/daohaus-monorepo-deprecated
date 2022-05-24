import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";

export namespace constants {
  export let BIGINT_ZERO = BigInt.fromI32(0);
  export let BIGINT_ONE = BigInt.fromI32(1);
  export let BIGDECIMAL_ZERO = new BigDecimal(constants.BIGINT_ZERO);
  export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
  export const BYTES32_ZERO =
    "0x0000000000000000000000000000000000000000000000000000000000000000";
  //daohaus.metadata.summoner
  export const DAOHAUS_METADATA_SUMMONER_TAG =
    "0x698d4b118c7bb81089255a1f6e345977b5ade76ad9bb1cb127f2e18ec8b255b2";
}
