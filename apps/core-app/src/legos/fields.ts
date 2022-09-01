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
  SHAMAN_ADDRESS: {
    id: 'shamanAddress',
    type: 'input',
    label: 'Shaman Address',
    placeholder: '0x1234...5678',
  },
  SHAMAN_PERMISSION: {
    id: 'shamanPermission',
    type: 'shamanPermissions',
    label: 'Shaman Permission',
  },
  SHAMAN_DELUXE: {
    id: 'shamanPermission',
    type: 'shamanPermissionDeluxe',
    label: 'Shaman Permission',
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
    label: 'Tags (separated by commas)',
    placeholder: 'DAO Name',
  },
  PROPOSAL_EXPIRY: {
    id: 'checkRender',
    type: 'checkRender',
    gateLabel: 'Add Expiration Date',
    customFields: CustomFields,
    components: [
      {
        id: 'proposalExpiry',
        // @ts-expect-error: doing object spread, even if the field definition has the property
        type: 'proposalExpiry',
        defaultValue: '0',
        label: 'Expiration',
      },
    ],
  },
  FAKE_MD: {
    id: 'article',
    type: 'fakeMarkdown',
    label: 'Real Fake MD Editor',
  },
  APPLICANT: {
    id: 'applicantAddress',
    type: 'selectApplicant',
    label: 'Applicant',
    daoMemberOnly: false,
  },
  PROP_OFFERING: {
    id: 'proposalOffering',
    type: 'proposalOffering',
  },
};
