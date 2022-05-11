import { Core } from '@self.id/core';
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link';
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
  ens: string | null;
  image?: string;
  name?: string;
  description?: string;
  emoji?: string;
  background?: string;
};

export default class Profile {
  client: Core;
  providers: Keychain;

  constructor(providers: Keychain) {
    this.providers = providers;
    this.client = new Core({ ceramic: 'testnet-clay' });
  }

  public async get(address: string): Promise<AccountProfile> {
    const ens = await this.getEns(address);
    const basicProfile = await this.getBasicProfile('0x1', address);
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
    const link = await Caip10Link.fromAccount(
      this.client.ceramic,
      `${address.toLowerCase()}@eip155:${Number(chain)}`
    );

    return this.client.get('basicProfile', link.did || '');
  }

  private async getEns(address: string): Promise<string | null> {
    const provider = new ethers.providers.JsonRpcProvider(
      this.providers['0x1']
    );
    return await provider.lookupAddress(address);
  }
}
