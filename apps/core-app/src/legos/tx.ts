import { POSTER_TAGS } from '@daohaus/common-utilities';
import { buildMultiCallTX } from '@daohaus/tx-builder-feature';

import { CONTRACT } from './contracts';

export const TX = {
  POST_SIGNAL: buildMultiCallTX({
    id: 'POST_SIGNAL',
    actions: [
      {
        contract: CONTRACT.POSTER,
        method: 'post',
        args: [
          {
            type: 'JSONDetails',
            jsonSchema: {
              title: `.formValues.title`,
              description: `.formValues.description`,
              link: `.formValues.link`,
              proposalType: { type: 'static', value: 'Signal Proposal' },
            },
          },
          { type: 'static', value: POSTER_TAGS.daoProfileUpdate },
        ],
      },
    ],
  }),
};
