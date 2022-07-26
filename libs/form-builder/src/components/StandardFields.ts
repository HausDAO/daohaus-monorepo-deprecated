import { FieldLego, FormLego } from '../types/legoTypes';

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
