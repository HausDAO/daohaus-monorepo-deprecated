import { Core } from '@self.id/core';
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link';
import { ConnectNetwork } from '@self.id/web';

import { Keychain } from '@daohaus/common-utilities';

export default class Account {
  // ceramic node
  // can instantiate a ceramic client
  // methods
  // // getAccount
  // // //  fetch ceramic basicProfile
  // // //  do ens lookup

  //     {
  //         Account: 'oxo',
  //         name:lll,
  //    description
  // ,       ens: 's.eth'
  //     }

  // define an accountProfile type
  //
  client: Core;

  constructor(network: ConnectNetwork, node: string) {
    this.client = new Core({ ceramic: network });
  }

  public async get(chain: keyof Keychain = '0x1', address: string) {
    // fetch number chain
    const link = await Caip10Link.fromAccount(
      this.client.ceramic,
      `${address.toLowerCase()}@eip155:${Number(chain)}`
    );

    return this.client.get('basicProfile', link.did || '');
  }
}
