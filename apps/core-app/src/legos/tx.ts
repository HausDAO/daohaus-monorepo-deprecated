import { LOCAL_ABI } from '@daohaus/abi-utilities';
import {
  CONTRACTS,
  NestedArray,
  POSTER_TAGS,
  ENCODED_0X0_DATA,
  toSeconds,
  TXLego,
  ValidArgType,
} from '@daohaus/common-utilities';
import { buildMultiCallTX } from '@daohaus/tx-builder-feature';
import { MaxUint256 } from '@ethersproject/constants';
import { CONTRACT } from './contracts';

const nestInArray = (arg: ValidArgType | ValidArgType[]): NestedArray => {
  return {
    type: 'nestedArray',
    args: Array.isArray(arg) ? arg : [arg],
  };
};

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
        args: [
          nestInArray('.formValues.recipient'),
          nestInArray('.formValues.sharesRequested'),
        ],
      },
      {
        contract: CONTRACT.CURRENT_DAO,
        method: 'mintLoot',
        args: [
          nestInArray('.formValues.recipient'),
          nestInArray('.formValues.lootRequested'),
        ],
      },
    ],
  }),
  ADD_SHAMAN: buildMultiCallTX({
    id: 'ADD_SHAMAN',
    JSONDetails: {
      type: 'JSONDetails',
      jsonSchema: {
        title: '.formValues.title',
        description: '.formValues.description',
        link: '.formValues.link',
        proposalType: { type: 'static', value: 'Add Shaman Proposal' },
      },
    },
    actions: [
      {
        contract: CONTRACT.CURRENT_DAO,
        method: 'setShamans',
        args: [
          nestInArray('.formValues.shamanAddress'),
          nestInArray('.formValues.shamanName'),
        ],
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
        proposalType: {
          type: 'static',
          value: 'Issue ERC20 Token Funding Proposal',
        },
      },
    },
    actions: [
      {
        // REVIEW: Why can't we do this?
        // contract: {
        //   ...CONTRACT.ERC20,
        //   targetAddress: '.formValues.paymentTokenAddress',
        // },
        contract: CONTRACT.ERC_20_FUNDING,
        method: 'transfer',
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
        proposalType: {
          type: 'static',
          value: 'Issue Network Token Funding Proposal',
        },
      },
    },
    actions: [
      {
        contract: {
          // REVIEW - contract/abi/args/method don't matter here just putting something
          type: 'static',
          contractName: 'NETWORK',
          abi: LOCAL_ABI.ERC20,
          targetAddress: '.formValues.recipient',
        },
        method: 'noMethod',
        args: [],
        value: '.formValues.paymentAmount',
        data: ENCODED_0X0_DATA,
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
  TOKENS_FOR_SHARES: {
    id: 'TOKENS_FOR_SHARES',
    contract: CONTRACT.TRIBUTE_MINION,
    method: 'submitTributeProposal',
    args: [
      '.daoId',
      '.formValues.tokenAddress',
      '.formValues.tokenAmount',
      '.formValues.sharesRequested',
      '.formValues.lootRequested',
      {
        type: 'proposalExpiry',
        search: '.proposalExpiry',
        fallback: toSeconds(14, 'days'),
      },
      {
        type: 'JSONDetails',
        jsonSchema: {
          title: '.formValues.title',
          description: '.formValues.description',
          link: '.formValues.link',
          proposalType: { type: 'static', value: 'Shares X Token Proposal' },
        },
      },
    ],
  },
};
