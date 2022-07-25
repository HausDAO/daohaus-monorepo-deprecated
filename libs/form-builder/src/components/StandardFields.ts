import { FieldLego } from '../types/legoTypes';

export const StandardFields: Record<string, FieldLego> = {
  Input: {
    id: 'id',
    label: 'Label',
    type: 'input',
    info: "This is a description of the field's purpose.",
    rules: {
      required: true,
    },
  },
  Switch: {
    id: 'id2',
    label: 'Label',
    type: 'switch',
    switches: [{ id: 'this', fieldLabel: 'Label' }],
    info: "This is a description of the field's purpose.",
  },
  InputSelect: {
    type: 'inputSelect',
    id: 'id3',
    label: 'Label',
    selectId: 'select-id3',
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
    info: "This is a description of the field's purpose.",
  },
  Radio: {
    type: 'radio',
    id: 'exampleRadio',
    label: 'Wrapped Radio',
    info: 'This is controlled by the info prop',
    radioGroup: {
      defaultValue: 'v1',
      radios: [
        { id: 'radio1', label: 'Value 1', value: 'v1' },
        { id: 'radio2', label: 'Value 2', value: 'v2' },
        { id: 'radio3', label: 'Value 3', value: 'v3' },
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
          info: "This is a description of the field's purpose.",
        },
        right: {
          id: 'id2345',
          label: 'Label',
          type: 'input',
          info: "This is a description of the field's purpose.",
        },
      },
    ],
  },
};
