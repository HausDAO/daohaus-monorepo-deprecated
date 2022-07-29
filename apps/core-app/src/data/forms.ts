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
                switches: [{ id: 'stakepoo', fieldLabel: 'Voting' }],
              },
            },
          ],
        },
      ],
    },
  ],
};
