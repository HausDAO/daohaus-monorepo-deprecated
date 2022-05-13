// import { Core } from '@self.id/core';
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

const CERAMIC_NETWORK = process.env['CERAMIC_NETWORK'] || '';

export default class Profile {
  // client: Core;
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
    const client = new CeramicClient('https://ceramic-clay.3boxlabs.com');
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

const profilModel = {
  definitions: {
    kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic: {
      alias: 'basicProfile',
      commits: [
        {
          jws: {
            payload: 'AXESIHQlyxvLYuiHGvjCREWnS0HxQV6z7lfPRe4mRdViHjWU',
            signatures: [
              {
                protected:
                  'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3NOWUU2V3RNWjNXTGJQd2NwOUdtN2RUN0ozRHNOUDhhdVFOblBwUUJ1MzdBI3o2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QSJ9',
                signature:
                  '619cILy5j-zkYwz0pJ2cYnPnVqmYf6YJcuqxcLoaRqvCL341HOoTm0siEOG_Jmu1alT_UUuah1dlrqubgIe1BA',
              },
            ],
            link: 'bafyreiduexfrxs3c5cdrv6gcirc2os2b6fav5m7ok7hul3rgixkwehrvsq',
          },
          linkedBlock:
            'o2RkYXRho2RuYW1lbUJhc2ljIFByb2ZpbGVmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnh0NzA2Z3Fmem1xNmNicWRrcHR6azh1dWRhcnlobGtmNmx5OXZ4MjFocXU0cjZrMWpxaW9rZGVzY3JpcHRpb254I0Jhc2ljIHByb2ZpbGUgaW5mb3JtYXRpb24gZm9yIGEgRElEZmhlYWRlcqJmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnkxZnA0czBud2RhcmgwdmFodXNhcnBwb3NnZXZ5MHBlbWl5a3ltZDJvcmQ2c3d0aGFyY3drY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QWdkb2N0eXBlZHRpbGU=',
        },
      ],
      schema: 'kjzl6cwe1jw146x1pnq7vg4t0lwea84s2a8u58tt1clfmv7mrju3l2341klxyu6',
      version:
        'k3y52l7qbv1frxi15d3n0k1w703mcwe4qnof7yjwvvsogryobz7uv3r2l33as8ydc',
    },
  },
  schemas: {
    kjzl6cwe1jw146x1pnq7vg4t0lwea84s2a8u58tt1clfmv7mrju3l2341klxyu6: {
      alias: 'BasicProfile',
      commits: [
        {
          jws: {
            payload: 'AXESIMy4lYCUWSpzFW5jKQ0mYJOQ67EQnv5Exuv3F599h-et',
            signatures: [
              {
                protected:
                  'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3NOWUU2V3RNWjNXTGJQd2NwOUdtN2RUN0ozRHNOUDhhdVFOblBwUUJ1MzdBI3o2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QSJ9',
                signature:
                  'yeEnzWKALkvTn_X7wjgL3ldLW8I8vWANs5QZmqI6PGbU5AJl12eIuWyID-mRPuGF9flovtGNX1P-qKkc6Y8JBA',
              },
            ],
            link: 'bafyreigmxckybfczfjzrk3tdfegsmyetsdv3cee67zcmn27xc6px3b7hvu',
          },
          linkedBlock:
            'o2RkYXRhpWR0eXBlZm9iamVjdGV0aXRsZWxCYXNpY1Byb2ZpbGVnJHNjaGVtYXgnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWEjanByb3BlcnRpZXOsY3VybKJkdHlwZWZzdHJpbmdpbWF4TGVuZ3RoGPBkbmFtZaJkdHlwZWZzdHJpbmdpbWF4TGVuZ3RoGJZlZW1vammiZHR5cGVmc3RyaW5naW1heExlbmd0aAJlaW1hZ2WhZCRyZWZ4GiMvZGVmaW5pdGlvbnMvaW1hZ2VTb3VyY2VzZmdlbmRlcqJkdHlwZWZzdHJpbmdpbWF4TGVuZ3RoGCppYmlydGhEYXRlo2R0eXBlZnN0cmluZ2Zmb3JtYXRkZGF0ZWltYXhMZW5ndGgKamJhY2tncm91bmShZCRyZWZ4GiMvZGVmaW5pdGlvbnMvaW1hZ2VTb3VyY2Vza2Rlc2NyaXB0aW9uomR0eXBlZnN0cmluZ2ltYXhMZW5ndGgZAaRsYWZmaWxpYXRpb25zomR0eXBlZWFycmF5ZWl0ZW1zomR0eXBlZnN0cmluZ2ltYXhMZW5ndGgYjGxob21lTG9jYXRpb26iZHR5cGVmc3RyaW5naW1heExlbmd0aBiMbW5hdGlvbmFsaXRpZXOjZHR5cGVlYXJyYXllaXRlbXOjZHR5cGVmc3RyaW5nZ3BhdHRlcm5qXltBLVpdezJ9JGhtYXhJdGVtcwVobWluSXRlbXMBcHJlc2lkZW5jZUNvdW50cnmjZHR5cGVmc3RyaW5nZ3BhdHRlcm5qXltBLVpdezJ9JGltYXhMZW5ndGgCa2RlZmluaXRpb25zpGdJUEZTVXJso2R0eXBlZnN0cmluZ2dwYXR0ZXJual5pcGZzOi8vLitpbWF4TGVuZ3RoGJZsaW1hZ2VTb3VyY2Vzo2R0eXBlZm9iamVjdGhyZXF1aXJlZIFob3JpZ2luYWxqcHJvcGVydGllc6Job3JpZ2luYWyhZCRyZWZ4GyMvZGVmaW5pdGlvbnMvaW1hZ2VNZXRhZGF0YWxhbHRlcm5hdGl2ZXOiZHR5cGVlYXJyYXllaXRlbXOhZCRyZWZ4GyMvZGVmaW5pdGlvbnMvaW1hZ2VNZXRhZGF0YW1pbWFnZU1ldGFkYXRho2R0eXBlZm9iamVjdGhyZXF1aXJlZIRjc3JjaG1pbWVUeXBlZXdpZHRoZmhlaWdodGpwcm9wZXJ0aWVzpWNzcmOhZCRyZWZ1Iy9kZWZpbml0aW9ucy9JUEZTVXJsZHNpemWhZCRyZWZ4HSMvZGVmaW5pdGlvbnMvcG9zaXRpdmVJbnRlZ2VyZXdpZHRooWQkcmVmeB0jL2RlZmluaXRpb25zL3Bvc2l0aXZlSW50ZWdlcmZoZWlnaHShZCRyZWZ4HSMvZGVmaW5pdGlvbnMvcG9zaXRpdmVJbnRlZ2VyaG1pbWVUeXBlomR0eXBlZnN0cmluZ2ltYXhMZW5ndGgYMm9wb3NpdGl2ZUludGVnZXKiZHR5cGVnaW50ZWdlcmdtaW5pbXVtAWZoZWFkZXKiZnNjaGVtYfdrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QWdkb2N0eXBlZHRpbGU=',
        },
      ],
      dependencies: {},
      version:
        'k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio',
    },
  },
  tiles: {},
};
