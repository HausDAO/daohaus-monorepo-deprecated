import { POSTER_ABI } from '@daohaus/contract-utilities';

import { ContractLego, POSTER_TAGS } from '@daohaus/common-utilities';
import {
  CoreFieldLookup,
  FormBuilder,
  FormLego,
} from '@daohaus/haus-form-builder';
import { Tooltip } from '@daohaus/ui';
import { buildMultiCallTX } from '@daohaus/tx-builder-feature';

const sampleDefaultData = {
  daoContract: '0x756ee8B8E898D497043c2320d9909f1DD5a7077F',
  daoName: 'DAO Name here',
};

const AppFieldLookup = {
  tooltip: Tooltip,
};

export const CustomFields = { ...CoreFieldLookup, ...AppFieldLookup };
type CustomFields = typeof CustomFields;

const Poster: ContractLego = {
  type: 'static',
  contractName: 'Poster',
  abi: POSTER_ABI,
  targetAddress: {
    '0x5': '0x000000000000cd17345801aa8147b8d3950260ff',
  },
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
  tx: buildMultiCallTX({
    id: 'TEST_TX',
    actions: [
      {
        contract: Poster,
        method: 'post',
        args: [
          '.formValues.title',
          { type: 'static', value: POSTER_TAGS.daoProfileUpdate },
        ],
      },
      {
        contract: Poster,
        method: 'post',
        args: [
          '.formValues.description',
          { type: 'static', value: POSTER_TAGS.daoProfileUpdate },
        ],
      },
    ],
  }),
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
