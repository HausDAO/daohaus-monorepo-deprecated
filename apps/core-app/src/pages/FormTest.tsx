import { BAAL_ABI, POSTER_ABI } from '@daohaus/contract-utilities';

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
import { Tooltip } from '@daohaus/ui';
import { searchApp } from '@daohaus/tx-builder-feature';

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
  abi: BAAL_ABI,
  keychain: {
    '0x5': '0x24357654d64da97a55fb2f73c5b66d1927ab1e4c',
  },
};

const Poster: ContractLego = {
  type: 'static',
  contractName: 'Poster',
  abi: POSTER_ABI,
  keychain: {
    '0x5': '0x000000000000cd17345801aa8147b8d3950260ff',
  },
};

const testActions: MulticallAction[] = [
  {
    contract: Poster,
    method: 'post',
    args: ['.title', { type: 'static', value: POSTER_TAGS.daoProfileUpdate }],
  },
  {
    contract: Poster,
    method: 'post',
    args: [
      '.description',
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
      type: 'proposalExpiry',
      fallback: toSeconds(14, 'days'),
    },
    {
      type: 'estimateGas',
      actions: testActions,
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

const TestForm: FormLego = {
  id: 'test',
  title: 'Test Form',
  subtitle: 'This is a test form',
  description: 'This is a test form',
  requiredFields: { title: true, description: true },
  fields: [
    {
      id: 'title',
      type: 'input',
      label: 'Title',
      placeholder: 'Enter title',
    },
    {
      id: 'description',
      type: 'textarea',
      label: 'Description',
      placeholder: 'Enter description',
    },
  ],
  tx: Test,
};

export function FormTest() {
  return (
    <FormBuilder
      form={TestForm}
      customFields={CustomFields}
      defaultValues={sampleDefaultData}
    />
  );
}

export default FormTest;
