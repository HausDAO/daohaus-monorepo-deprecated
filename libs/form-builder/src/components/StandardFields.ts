import { FieldLego, FormLego } from '../types/legoTypes';

export const StandardFields: Record<string, FieldLego> = {
  // Input: {
  //   id: 'id',
  //   label: 'Label',
  //   type: 'input',
  //   info: "This is a description of the field's purpose.",
  //   rules: {
  //     required: 'This Field is required.',
  //   },
  // },
  // Switch: {
  //   id: 'id2',
  //   label: 'Label',
  //   type: 'switch',
  //   switches: [{ id: 'this', fieldLabel: 'Label' }],
  //   info: "This is a description of the field's purpose.",
  // },
  // InputSelect: {
  //   type: 'inputSelect',
  //   id: 'id3',
  //   label: 'Label',
  //   selectId: 'select-id3',
  //   options: [
  //     { name: 'Doh', value: 'doh' },
  //     { name: 'Doh2', value: 'doh2' },
  //   ],
  //   info: "This is a description of the field's purpose.",
  // },
  // TextArea: {
  //   id: 'id4',
  //   type: 'textarea',
  //   label: 'Label',
  //   placeholder: 'Placeholder',
  //   info: "This is a description of the field's purpose.",
  // },
  // Radio: {
  //   type: 'radio',
  //   id: 'exampleRadio',
  //   label: 'Wrapped Radio',
  //   info: 'This is controlled by the info prop',
  //   radioGroup: {
  //     defaultValue: 'v1',
  //     radios: [
  //       { id: 'radio1', label: 'Value 1', value: 'v1' },
  //       { id: 'radio2', label: 'Value 2', value: 'v2' },
  //       { id: 'radio3', label: 'Value 3', value: 'v3' },
  //     ],
  //   },
  // },
  // Select: {
  //   type: 'select',
  //   id: 'exampleSelect',
  //   label: 'Label',
  //   options: [
  //     { name: 'Doh', value: 'doh' },
  //     { name: 'Doh2', value: 'doh2' },
  //   ],
  // },
  // SplitTest: {
  //   id: 'test',
  //   type: 'splitColumn',
  //   rows: [
  //     {
  //       rowId: 'top',
  //       left: {
  //         id: 'id23555',
  //         label: 'Label',
  //         type: 'select',
  //         options: [
  //           { name: 'Doh', value: 'doh' },
  //           { name: 'Doh2', value: 'doh2' },
  //         ],
  //         info: "This is a description of the field's purpose.",
  //       },
  //       right: {
  //         id: 'id2345',
  //         label: 'Label',
  //         type: 'input',
  //         info: "This is a description of the field's purpose.",
  //       },
  //     },
  //   ],
  // },
};

const CommonFields: Record<string, FieldLego> = {
  DAOContract: {
    type: 'input',
    id: 'DAOContract',
    label: 'DAO Contract',
    info: 'The DAO contract address',
    address: true,
    placeholder: '0x0000000000000000000000000000000000000000',
  },
  DAOName: {
    type: 'input',
    id: 'DAOName',
    label: 'DAO Name',
    info: 'The name of the DAO',
    placeholder: 'Namey McNameson',
  },
  Description: {
    type: 'textarea',
    id: 'description',
    label: 'Description',
    info: 'The description of the DAO',
    placeholder: 'Your lovely description goes here',
  },
};

export const MetadataProposal: FormLego = {
  id: 'MetadataProposal',
  title: 'Update Metadata Settings',
  subtitle: 'Settings',
  description:
    'This form creates a proposal to change the DAOs Metadata settings.',
  submitButtonText: 'Save Settings',
  fields: [
    CommonFields.DAOContract,
    CommonFields.DAOName,
    CommonFields.Description,
    {
      id: 'socials',
      type: 'formSegment',
      title: 'Social Links',
      description: 'Update the social links for this DAO.',
      fields: [
        {
          type: 'input',
          id: 'twitter',
          label: 'Twitter',
          placeholder: '@twitter',
        },
        {
          type: 'input',
          id: 'discord',
          label: 'Discord Link',
          placeholder: 'discord.gg/daoname',
        },
        {
          type: 'input',
          id: 'website',
          label: 'DAO Website',
          placeholder: 'https://daoname.com',
        },
        {
          type: 'input',
          id: 'github',
          label: 'GitHub',
          placeholder: 'github.com/daoname',
        },
        {
          type: 'input',
          id: 'tags',
          label: 'Tags (separate by Commas)',
        },
      ],
    },
  ],
};
