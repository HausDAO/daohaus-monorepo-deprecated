import { TXLego } from '@daohaus/common-utilities';
import { buildMultiCallTX } from '@daohaus/tx-builder-feature';
import { CONTRACT } from './contractBlocks';

export const TABULA_TX: Record<string, TXLego> = {
  CREATE_PUB: buildMultiCallTX({
    id: 'CREATE_PUB',
    JSONDetails: {
      type: 'JSONDetails',
      jsonSchema: {
        title: '.formValues.title',
        description: '.formValues.description',
        link: '.formValues.link',
      },
    },
    actions: [
      {
        contract: CONTRACT.POSTER,
        method: 'post',
        args: [
          {
            type: 'JSONDetails',
            jsonSchema: {
              action: { type: 'static', value: 'publication/create' },
              title: '.formValues.pubTitle',
              description: '.formValues.pubDescription',
              tags: '.formValues.pubTags',
            },
          },
          { type: 'static', value: 'PUBLICATION' },
        ],
      },
    ],
  }),
};
