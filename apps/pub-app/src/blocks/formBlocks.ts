import { FormLego } from '@daohaus/haus-form-builder';
import { FIELD } from './fieldBlock';
import { TABULA_TX } from './txBlocks';

export const TABULA_FORMS: Record<string, FormLego> = {
  CREATE_PUB: {
    id: 'CREATE_PUB',
    title: 'Create Publication',
    subtitle: 'Create Pub Proposal',
    description: 'Create a publication on Tabula.gg',
    tx: TABULA_TX.CREATE_PUB,
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'pubSegment',
        type: 'formSegment',
        title: 'Publication Data',
        fields: [
          {
            id: 'pubTitle',
            type: 'input',
            placeholder: 'pubtitle',
            label: 'Publication Title',
          },
          {
            id: 'pubDescription',
            type: 'textarea',
            placeholder: 'pub description',
            label: 'Publication Description',
          },
          {
            id: 'pubTags',
            type: 'csInput',
            itemNoun: {
              singular: 'tag',
              plural: 'tags',
            },
            placeholder: 'pub description',
            label: 'Publication Description',
          },
        ],
      },
    ],
  },
};
