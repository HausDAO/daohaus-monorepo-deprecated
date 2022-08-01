import { FormLego } from '@daohaus/haus-form-builder';

export const GovernanceProposal: FormLego = {
  id: 'GovernanceProposal',
  title: 'Update Governance Settings',
  subtitle: 'Settings',
  description: 'Learn more about governance settings.',
  submitButtonText: 'Submit Proposal',
  devtool: true,
  requiredFields: {
    proposalTitle: true,
  },
  fields: [
    {
      type: 'input',
      id: 'proposalTitle',
      label: 'Proposal Title',
      placeholder: 'Proposal Name',
      expectType: 'number',
      rules: {
        min: 42,
      },
    },
    {
      type: 'textarea',
      id: 'proposalDescription',
      label: 'Proposal Description',
      placeholder: 'Proposal Description',
    },
    {
      type: 'formSegment',
      id: 'segment',
      title: 'Stake Tokens',
      description: 'Update token transferability',
      fields: [
        {
          id: 'split',
          type: 'splitColumn',
          rows: [
            {
              rowId: 'default',
              left: {
                type: 'switch',
                id: 'stakeEnabled',
                switches: [{ id: 'stakeEnabled', fieldLabel: 'Voting' }],
              },
              right: {
                type: 'switch',
                id: 'stakeEnabled',
                switches: [{ id: 'stakeypoo', fieldLabel: 'Voting' }],
              },
            },
          ],
        },
      ],
    },
  ],
};

export const MetadataConfig: FormLego = {
  id: 'MetaDataConfig',
  title: 'Update Metadata Settings',
  subtitle: 'Settings',
  fields: [
    {
      type: 'input',
      id: 'daoContract',
      label: 'DAO Contract',
      address: true,
      placeholder: '0x0000000000000000000000000000000000000000',
      expectType: 'ethAddress',
    },
    {
      type: 'input',
      id: 'daoName',
      label: 'DAO Name',
      placeholder: 'DAO Name',
    },
    {
      type: 'textarea',
      id: 'description',
      label: 'Description',
      placeholder: "Your DAO's description",
    },
    {
      type: 'formSegment',
      title: 'Social',
      description: 'Update social media links',
      id: 'socialsSegment',
      fields: [
        {
          type: 'input',
          id: 'website',
          label: 'Website',
          placeholder: 'https://example.com',
        },
        {
          type: 'input',
          id: 'twitter',
          label: 'Twitter',
          placeholder: 'https://twitter.com/daoName',
        },
        {
          type: 'input',
          id: 'discord',
          label: 'Discord',
          placeholder: 'https://discord.gg/daoName',
        },
        {
          type: 'input',
          id: 'telegram',
          label: 'Telegram',
          placeholder: 'https://t.me/daoName',
        },
        {
          type: 'input',
          id: 'github',
          label: 'Github',
          placeholder: 'https://github.com/daoName',
        },
      ],
    },
    {
      type: 'csInput',
      id: 'cs',
      label: 'CS',
      itemNoun: {
        singular: 'tag',
        plural: 'tags',
      },
    },
  ],
};
