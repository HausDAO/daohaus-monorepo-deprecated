import { Core } from '@self.id/core';
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link';
import { ConnectNetwork } from '@self.id/web';
import { ethers } from 'ethers';

import { Keychain } from '@daohaus/common-utilities';

type BasicProfile = {
  image?: string;
  name?: string;
  description?: string;
  emoji?: string;
  background?: string;
};

type AccountProfile = {
  address: string;
  ens?: string;
  image?: string;
  name?: string;
  description?: string;
  emoji?: string;
  background?: string;
};

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
  providers: Keychain;

  constructor(network: ConnectNetwork, node: string, providers: Keychain) {
    this.client = new Core({ ceramic: network });
    this.providers = providers;
  }

  public async get(
    chain: keyof Keychain,
    address: string
  ): Promise<AccountProfile> {
    const basicProfile = await this.getBasicProfile('0x1', address);
    const ens = await this.getEns(chain, address);

    console.log('ens', ens);
    console.log('basicProfile', basicProfile);

    return {
      address,
      ens,
      image: basicProfile?.image,
      name: basicProfile?.name,
      description: basicProfile?.description,
      emoji: basicProfile?.emoji,
      background: basicProfile?.background,
    };
  }

  private async getBasicProfile(
    chain: keyof Keychain = '0x1',
    address: string
  ): Promise<BasicProfile | null> {
    // fetch number chain
    const link = await Caip10Link.fromAccount(
      this.client.ceramic,
      `${address.toLowerCase()}@eip155:${Number(chain)}`
    );

    return this.client.get('basicProfile', link.did || '');
  }

  private async getEns(
    chain: keyof Keychain,
    address: string
  ): Promise<string> {
    const provider = new ethers.providers.JsonRpcProvider(
      this.providers[chain]
    );

    return await provider.lookupAddress(address);
  }
}
