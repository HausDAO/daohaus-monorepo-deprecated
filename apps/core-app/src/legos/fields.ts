import { CustomFieldLego } from './config';

export const FIELD: Record<string, CustomFieldLego> = {
  TITLE: {
    id: 'TITLE',
    type: 'input',
    label: 'Title',
    placeholder: 'Enter title',
  },
  DESCRIPTION: {
    id: 'DESCRIPTION',
    type: 'textarea',
    label: 'Description',
    placeholder: 'Enter description',
  },
  LINK: {
    id: 'LINK',
    type: 'input',
    label: 'Link',
    placeholder: 'http://',
  },
  TRIBUTE: {
    id: 'TRIBUTE',
    type: 'tributeInput',
    label: 'Tribute',
    selectId: 'TRIBUTE_SELECT',
  },
};
