import { ethers } from 'ethers';

import { Keychain } from '@daohaus/common-utilities';

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
  providers: Keychain;

  constructor(providers: Keychain) {
    this.providers = providers;
  }

  public async get(address: string): Promise<AccountProfile> {
    const ens = await this.getEns(address);

    return {
      address,
      ens,
    };
  }

  private async getEns(address: string): Promise<string | null> {
    const provider = new ethers.providers.JsonRpcProvider(
      this.providers['0x1']
    );
    return await provider.lookupAddress(address);
  }
}
