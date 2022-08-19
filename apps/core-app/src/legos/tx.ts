import { CONTRACTS, POSTER_TAGS, TXLego } from '@daohaus/common-utilities';
import { buildMultiCallTX } from '@daohaus/tx-builder-feature';
import { MaxUint256 } from '@ethersproject/constants';
import { CONTRACT } from './contracts';

export const TX: Record<string, TXLego> = {
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
  APPROVE_TOKEN: {
    id: 'APPROVE_TOKEN',
    contract: CONTRACT.ERC_20,
    method: 'approve',
    args: [
      { type: 'singleton', keychain: CONTRACTS.TRIBUTE_MINION },
      { type: 'static', value: MaxUint256 },
    ],
  },
};
