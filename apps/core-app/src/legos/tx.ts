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
          { type: 'static', value: POSTER_TAGS.signalProposal },
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
  ISSUE: buildMultiCallTX({
    id: 'ISSUE',
    JSONDetails: {
      type: 'JSONDetails',
      jsonSchema: {
        title: '.formValues.title',
        description: '.formValues.description',
        link: '.formValues.link',
        proposalType: { type: 'static', value: 'Issue Tokens Proposal' },
      },
    },
    actions: [
      {
        contract: CONTRACT.CURRENT_DAO,
        method: 'mintShares',
        args: ['.formValues.recipient', '.formValues.sharesRequested'],
      },
      {
        contract: CONTRACT.CURRENT_DAO,
        method: 'mintLoot',
        args: ['.formValues.recipient', '.formValues.lootRequested'],
      },
    ],
  }),
  UPDATE_METADATA_SETTINGS: {
    id: 'UPDATE_METADATA_SETTINGS',
    contract: CONTRACT.POSTER,
    method: 'post',
    args: [
      {
        type: 'JSONDetails',
        jsonSchema: {
          daoId: '.daoId',
          name: '.formValues.name',
          description: '.formValues.description',
          longDescription: '.formValues.long_description',
          avatarImg: '.formValues.icon',
          tags: '.formValues.tags',
          links: {
            type: 'JSONDetails',
            jsonSchema: {
              discord: '.formValues.discord',
              github: '.formValues.github',
              medium: '.formValues.medium',
              telegram: '.formValues.telegram',
              twitter: '.formValues.twitter',
              other: '.formValues.other',
            },
          },
        },
      },
      { type: 'static', value: POSTER_TAGS.daoProfileUpdate },
    ],
  },
};
