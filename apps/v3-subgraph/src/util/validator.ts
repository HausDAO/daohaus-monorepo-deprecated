import { Address, dataSource, log } from '@graphprotocol/graph-ts';

export namespace validator {
  export function isSummoner(senderAddress: Address | null): boolean {
    if (senderAddress === null) {
      return false;
    }

    log.info('senderAddress: {}', [senderAddress.toHexString()]);

    let factoryAddress = dataSource.address();

    log.info('factoryAddress: {}', [factoryAddress.toHexString()]);

    return true;
  }
}
