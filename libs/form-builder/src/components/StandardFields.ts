import { FieldLego } from '../types/legoTypes';

export const StandardFields: Record<string, FieldLego> = {
  Input: {
    id: 'id',
    label: 'Label',
    type: 'input',
    required: true,
    info: "This is a description of the field's purpose.",
  },
  Switch: {
    id: 'id2',
    label: 'Label',
    type: 'switch',
    required: true,
    switches: [{ fieldLabel: 'Label' }],
    info: "This is a description of the field's purpose.",
  },
  InputSelect: {
    type: 'inputSelect',
    id: 'id3',
    label: 'Label',
    selectId: 'select-id3',
    required: true,
    options: [
      { name: 'Doh', value: 'doh' },
      { name: 'Doh2', value: 'doh2' },
    ],
    info: "This is a description of the field's purpose.",
  },
  TextArea: {
    id: 'id4',
    type: 'textarea',
    label: 'Label',
    placeholder: 'Placeholder',
    required: true,
    info: "This is a description of the field's purpose.",
  },
  Radio: {
    type: 'radio',
    id: 'exampleRadio',
    label: 'Wrapped Radio',
    info: 'This is controlled by the info prop',
    radioGroup: {
      radios: [
        { id: 'g1r1', label: 'Value 1', value: 'v1' },
        { id: 'g1r2', label: 'Value 2', value: 'v2' },
        { id: 'g1r3', label: 'Value 3', value: 'v3' },
      ],
    },
  },
  Select: {
    type: 'select',
    id: 'exampleSelect',
    label: 'Label',
    options: [
      { name: 'Doh', value: 'doh' },
      { name: 'Doh2', value: 'doh2' },
    ],
  },
  SplitTest: {
    id: 'test',
    type: 'splitColumn',
    rows: [
      {
        rowId: 'top',
        left: {
          id: 'id23555',
          label: 'Label',
          type: 'select',
          options: [
            { name: 'Doh', value: 'doh' },
            { name: 'Doh2', value: 'doh2' },
          ],
          required: true,
          info: "This is a description of the field's purpose.",
        },
        right: {
          id: 'id2345',
          label: 'Label',
          type: 'input',
          required: true,
          info: "This is a description of the field's purpose.",
        },
      },
    ],
  },
};
