import { Address, dataSource, log } from "@graphprotocol/graph-ts";
// import { constants } from "./constants";

export namespace validator {
  export function isSummoner(senderAddress: Address | null): boolean {
    if (senderAddress === null) {
      return false;
    }

    log.info("senderAddress: {}", [senderAddress.toHexString()]);

    let factoryAddress = dataSource.address();

    log.info("factoryAddress: {}", [factoryAddress.toHexString()]);

    // return factoryAddress.toHexString() === senderAddress.toHexString();

    // senderAddress === factoryAddress
    // store factory address in constants... but how to switch on network?

    return true;
  }

  // export function isMolochMinion(
  //   molochAddress: string,
  //   senderAddress: Address | null
  // ): boolean {
  //   if (senderAddress === null) {
  //     return false;
  //   }
  //   let address = changetype<Address>(senderAddress);
  //   let minionContract = Minion.bind(address);

  //   let result = minionContract.try_moloch();
  //   if (result.reverted) {
  //     log.info("^^^^^ minion call failed; {}", [molochAddress]);
  //     return false;
  //   }

  //   log.info("^^^^^ comparing; {} with {}", [
  //     result.value.toHexString(),
  //     molochAddress,
  //   ]);

  //   return result.value.toHexString() == molochAddress;
  // }

  // export function isMolochMember(
  //   molochAddress: string,
  //   senderAddress: Address
  // ): boolean {
  //   let memberId = molochAddress
  //     .concat("-member-")
  //     .concat(senderAddress.toHexString());

  //   let member = Member.load(memberId);

  //   if (member === null) {
  //     return false;
  //   }

  //   if (member.shares === constants.BIGINT_ZERO) {
  //     return false;
  //   }

  //   return true;
  // }
}
