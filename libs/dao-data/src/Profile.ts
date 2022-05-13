import { Caip10Link } from '@ceramicnetwork/stream-caip10-link';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { TileDocument } from '@ceramicnetwork/stream-tile';
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

const CERAMIC_NODE = process.env['CERAMIC_NODE'] || '';

export default class Profile {
  providers: Keychain;

  constructor(providers: Keychain) {
    this.providers = providers;
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
  ): Promise<BasicProfile> {
    const client = new CeramicClient(
      CERAMIC_NODE || 'https://ceramic-clay.3boxlabs.com'
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
    const doc = await TileDocument.load(client, defId);
    return doc.content as BasicProfile;
  }

  private async getEns(address: string): Promise<string | null> {
    const provider = new ethers.providers.JsonRpcProvider(
      this.providers['0x1']
    );
    return await provider.lookupAddress(address);
  }
}
