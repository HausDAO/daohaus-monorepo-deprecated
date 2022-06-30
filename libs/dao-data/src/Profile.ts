import { Core } from '@self.id/core';
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link';
import { ethers } from 'ethers';

import { Keychain } from '@daohaus/common-utilities';

import { AccountProfile, BasicProfile } from './types';
import { transformProfile } from './utils/transformers';

export default class Profile {
  providers: Keychain;
  ceramicNode: string;

  constructor(providers: Keychain, node?: string) {
    this.providers = providers;
    this.ceramicNode = node || '';
  }

  public async get(address: string): Promise<AccountProfile> {
    const ens = await this.getEns(address);
    const basicProfile = await this.getBasicProfile('0x1', address);

    return transformProfile(address, ens, basicProfile);
  }

  private async getBasicProfile(
    chain: keyof Keychain = '0x1',
    address: string
  ): Promise<BasicProfile> {
    const core = new Core({
      ceramic: this.ceramicNode || 'https://gateway.ceramic.network',
    });
    const link = await Caip10Link.fromAccount(
      core.ceramic,
      `${address.toLowerCase()}@eip155:${Number(chain)}`
    );

    const profile = await core.get('basicProfile', link.did || '');
    if (Object.keys(profile).length === 0) {
      return {};
    }

    return profile;
  }

  private async getEns(address: string): Promise<string | null> {
    const provider = new ethers.providers.JsonRpcProvider(
      this.providers['0x1']
    );
    try {
      return await provider.lookupAddress(address);
    } catch {
      return null;
    }
  }
}
