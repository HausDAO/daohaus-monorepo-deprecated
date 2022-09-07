import { FieldLego } from '@daohaus/haus-form-builder';

export const FIELD: Record<string, FieldLego> = {
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
  TRIBUTE: {
    id: 'tribute',
    type: 'tributeInput',
    label: 'Tribute',
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
};
