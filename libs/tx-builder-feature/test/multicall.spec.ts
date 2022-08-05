import { LOCAL_ABI } from '@daohaus/abi-utilities';
import { ContractLego, POSTER_TAGS, TXLego } from '@daohaus/common-utilities';

const TestBaalContract: ContractLego = {
  type: 'local',
  contractName: 'TestBaal',
  abi: LOCAL_ABI.BAAL,
  keychain: {
    '0x5': '0x24357654d64da97a55fb2f73c5b66d1927ab1e4c',
  },
};

const Poster: ContractLego = {
  type: 'local',
  contractName: 'Poster',
  abi: LOCAL_ABI.POSTER,
  keychain: {
    '0x5': '0x000000000000cd17345801aa8147b8d3950260ff',
  },
};

const TestTX: TXLego = {
  id: 'TestTX',
  contract: TestBaalContract,
  method: 'submitProposal',
  args: [
    {
      type: 'multicall',
      actions: [
        {
          contract: Poster,
          method: 'post',
          args: [
            { type: 'static', value: 'Foo' },
            { type: 'static', value: POSTER_TAGS.daoProfileUpdate },
          ],
        },
        {
          contract: Poster,
          method: 'post',
          args: [
            { type: 'static', value: 'Bar' },
            { type: 'static', value: POSTER_TAGS.daoProfileUpdate },
          ],
        },
      ],
    },
    {
      type: 'static',
      value: 0,
    },
    {
      type: 'static',
      value: 0,
    },
    {
      type: 'JSONDetails',
      args: [
        { title: '.values.title', description: '.formValues.description' },
      ],
    },
  ],
};
