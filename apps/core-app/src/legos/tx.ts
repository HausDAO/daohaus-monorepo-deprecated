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
  ISSUE_ERC20: buildMultiCallTX({
    id: 'ISSUE_ERC20',
    JSONDetails: {
      type: 'JSONDetails',
      jsonSchema: {
        title: '.formValues.title',
        description: '.formValues.description',
        link: '.formValues.link',
        proposalType: { type: 'static', value: 'Issue Funding Proposal' },
      },
    },
    actions: [
      {
        // contract: {
        //   ...CONTRACT.ERC20,
        //   targetAddress: '.formValues.paymentTokenAddress',
        // },
        contract: CONTRACT.ERC_20_FUNDING,
        method: 'tranfer',
        args: ['.formValues.recipient', '.formValues.paymentTokenAmt'],
      },
    ],
  }),
  ISSUE_NETWORK_TOKEN: buildMultiCallTX({
    id: 'ISSUE_NETWORK_TOKEN',
    JSONDetails: {
      type: 'JSONDetails',
      jsonSchema: {
        title: '.formValues.title',
        description: '.formValues.description',
        link: '.formValues.link',
        proposalType: { type: 'static', value: 'Issue Funding Proposal' },
      },
    },
    actions: [
      {
        // contract: {
        //   ...CONTRACT.ERC20,
        //   targetAddress: '.formValues.paymentTokenAddress',
        // },
        // need to overwrite the data here to 0x0 and add to value
        // walk through the action encoding
        contract: CONTRACT.ERC_20_FUNDING,
        method: 'tranfer',
        args: ['.formValues.recipient', '.formValues.paymentTokenAmt'],
      },
    ],
    value: '.formValues.paymentAmount',
  }),
};
