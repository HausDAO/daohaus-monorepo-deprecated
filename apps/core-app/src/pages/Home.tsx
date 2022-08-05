import { LOCAL_ABI } from '@daohaus/abi-utilities';
import { ContractLego, POSTER_TAGS, TXLego } from '@daohaus/common-utilities';
import { HausLayout } from '@daohaus/daohaus-connect-feature';
import {
  CoreFieldLookup,
  FieldLego,
  FormBuilder,
  FormLego,
} from '@daohaus/haus-form-builder';
import { Tooltip } from '@daohaus/ui';

const sampleDefaultData = {
  daoContract: '0x756ee8B8E898D497043c2320d9909f1DD5a7077F',
  daoName: 'DAO Name here',
};

const AppFieldLookup = {
  tooltip: Tooltip,
};

const tooltipTest: FieldLego<typeof AppFieldLookup> = {
  type: 'tooltip',
  content: 'This is a tooltip',
  side: 'left',
};

export const CustomFields = { ...CoreFieldLookup, ...AppFieldLookup };
type CustomFields = typeof CustomFields;

const TestBaalContract: ContractLego = {
  type: 'static',
  contractName: 'TestBaal',
  abi: LOCAL_ABI.BAAL,
  keychain: {
    '0x5': '0x24357654d64da97a55fb2f73c5b66d1927ab1e4c',
  },
};

const Poster: ContractLego = {
  type: 'static',
  contractName: 'Poster',
  abi: LOCAL_ABI.POSTER,
  keychain: {
    '0x5': '0x000000000000cd17345801aa8147b8d3950260ff',
  },
};

const Test: TXLego = {
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
      type: 'static',
      value: JSON.stringify({
        title: 'Test title',
        description: 'Test description',
      }),
      // args: [
      //   { title: '.values.title', description: '.formValues.description' },
      // ],
    },
  ],
};

const TestForm: FormLego<CustomFields> = {
  id: 'test',
  title: 'Test Form',
  subtitle: 'This is a test form',
  description: 'This is a test form',
  fields: [tooltipTest, { type: 'input', id: 'foo' }],
  tx: Test,
};

export function Home() {
  return (
    <HausLayout navLinks={[{ label: 'NavLink', href: '/' }]}>
      <FormBuilder<CustomFields>
        form={TestForm}
        customFields={CustomFields}
        defaultValues={sampleDefaultData}
      />
    </HausLayout>
  );
}

export default Home;
