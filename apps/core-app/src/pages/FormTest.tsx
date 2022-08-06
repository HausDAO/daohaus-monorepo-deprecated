import { LOCAL_ABI } from '@daohaus/abi-utilities';
import {
  ContractLego,
  MulticallAction,
  POSTER_TAGS,
  toSeconds,
  TXLego,
} from '@daohaus/common-utilities';
import {
  CoreFieldLookup,
  FieldLego,
  FormBuilder,
  FormLego,
} from '@daohaus/haus-form-builder';
import { Button, Tooltip } from '@daohaus/ui';
import { handleGasEstimate } from '@daohaus/tx-builder-feature';
import { useDao } from '../contexts/DaoContext';

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

const testActions: MulticallAction[] = [
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
];

const Test: TXLego = {
  id: 'TestTX',
  contract: TestBaalContract,
  method: 'submitProposal',
  args: [
    {
      type: 'multicall',
      actions: testActions,
    },
    {
      type: 'estimateGas',
      actions: testActions,
    },
    {
      type: 'proposalExpiry',
      fallback: toSeconds(14, 'days'),
    },
    {
      type: 'static',
      value: JSON.stringify({
        title: 'Test title',
        description: 'Test description',
      }),
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

export function FormTest() {
  const { dao } = useDao();
  const testGas = async () => {
    const result = await handleGasEstimate({
      chainId: '0x5',
      safeId: dao?.safeAddress,
      arg: {
        type: 'estimateGas',
        actions: testActions,
      },
    });

    console.log('Result', result);
  };
  return (
    <>
      <FormBuilder<CustomFields>
        form={TestForm}
        customFields={CustomFields}
        defaultValues={sampleDefaultData}
      />
      <Button onClick={testGas}>Test Gas</Button>
    </>
  );
}

export default FormTest;
