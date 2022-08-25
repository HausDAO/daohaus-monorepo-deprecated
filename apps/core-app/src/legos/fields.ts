import { CustomFields, CustomFieldLego } from './config';

export const FIELD: Record<string, CustomFieldLego> = {
  TITLE: {
    id: 'title',
    type: 'input',
    label: 'Proposal Name',
    placeholder: 'Enter title',
  },
  DESCRIPTION: {
    id: 'description',
    type: 'textarea',
    label: 'Description',
    placeholder: 'Enter description',
  },
  LINK: {
    id: 'link',
    type: 'input',
    label: 'Link',
    placeholder: 'http://',
    expectType: 'url',
  },
  TRIBUTE: {
    id: 'tribute',
    type: 'tributeInput',
    label: 'Tribute',
  },
  REQUEST_TOKEN: {
    id: 'payment',
    type: 'requestERC20',
    label: 'Requested ERC20',
  },
  REQUEST_NATIVE_TOKEN: {
    id: 'paymentAmount',
    type: 'requestNativeToken',
  },
  TO_WEI: {
    id: 'shouldOverwrite',
    type: 'toWeiInput',
    label: 'Should Overwrite',
  },
  NAME: {
    id: 'name',
    type: 'input',
    label: 'DAO Name',
    placeholder: 'DAO Name',
  },
  TAGS: {
    id: 'tags',
    type: 'tagsInput',
    label: 'Tags (seperated by commas)',
    placeholder: 'DAO Name',
  },
  PROPOSAL_EXPIRY: {
    id: 'checkRender',
    type: 'checkRender',
    gateLabel: 'Add Expiration Date',
    customFields: CustomFields,
    components: [
      {
        id: 'expiryValue',
        type: 'inputSelect',
        defaultValue: '0',
        selectDefault: `${3600 * 24}`,
        label: 'Expiration',
        selectId: 'expiryPeriod',
        options: [
          { value: `${1}`, name: 'Seconds' },
          { value: `${60}`, name: 'Minutes' },
          { value: `${3600}`, name: 'Hours' },
          { value: `${3600 * 24}`, name: 'Days' },
        ],
      },
      {
        id: 'highlightProposalExpiry',
        type: 'highlightInputText',
        description: 'Expiration will be on:',
        highlightColor: '#B4D7CE',
        highlightInputId: 'proposalExpiryString',
      },
      {
        id: 'expirationDateDescription',
        type: 'highlightInputText',
        description:
          'The expiration date includes Voting and Grace Periods. Adjust the days or hour to update the expiration.',
      },
      {
        id: 'proposalExpiryString',
        // @ts-expect-error: cannot resolve type using custom fields sent from the core-app
        type: 'proposalExpiry',
        hidden: true,
        periodFieldIds: ['expiryValue', 'expiryPeriod'],
      },
    ],
  },
};
