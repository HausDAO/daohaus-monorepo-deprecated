import { LOCAL_ABI } from '@daohaus/abi-utilities';

import { ContractLego, POSTER_TAGS } from '@daohaus/common-utilities';
import { FormBuilder, FormLego } from '@daohaus/haus-form-builder';
import { buildMultiCallTX } from '@daohaus/tx-builder-feature';

const Poster: ContractLego = {
  type: 'static',
  contractName: 'Poster',
  abi: LOCAL_ABI.POSTER,
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
    {
      id: 'checkGate',
      type: 'checkGate',
      gateLabel: 'Toggle field',
      fields: [
        {
          id: 'title',
          selectId: 'selectID',
          type: 'inputSelect',
          label: 'Title',
          // placeholder: 'Enter title',
          
          // info: 'This is controlled by the info prop',
          options: [
            { value: `${3600 * 24}`, name: 'Days' },
            { value: `${3600}`, name: 'Hours' },
            { value: `${60}`, name: 'Minutes' },
          ],
          // helperText: 'Test the action/controls',
          // selectPlaceholder: '-period-',
        },
      ]
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
  return <FormBuilder form={TestForm} />;
}

export default FormTest;
