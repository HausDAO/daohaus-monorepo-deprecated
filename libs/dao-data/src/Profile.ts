import { Caip10Link } from '@ceramicnetwork/stream-caip10-link';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { TileDocument } from '@ceramicnetwork/stream-tile';
import { ethers } from 'ethers';

import { Keychain } from '@daohaus/common-utilities';
import { AccountProfile, BasicProfile } from './types';

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

    return {
      address,
      ens,
      ...basicProfile,
    };
  }

  private async getBasicProfile(
    chain: keyof Keychain = '0x1',
    address: string
  ): Promise<BasicProfile> {
    const client = new CeramicClient(
      this.ceramicNode || 'https://ceramic-clay.3boxlabs.com'
    );
    const link = await Caip10Link.fromAccount(
      client,
      `${address.toLowerCase()}@eip155:${Number(chain)}`
    );

    const index = (await TileDocument.deterministic(client, {
      controllers: [link.did || ''],
      family: 'IDX',
    })) as TileDocument;
    const defId =
      index.content?.[
        'kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic'
      ] ?? null;

    if (defId) {
      const doc = await TileDocument.load(client, defId);
      return doc.content as BasicProfile;
    } else {
      return {};
    }
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
