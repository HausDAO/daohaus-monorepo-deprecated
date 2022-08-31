import { SUMMON_COPY } from '../data/copy';
import { CustomFormLego } from './config';
import { FIELD } from './fields';
import { TABULA_TX, TX } from './tx';

export const getFormLegoById = (
  id: CustomFormLego['id']
): CustomFormLego | undefined => {
  const formKey = Object.keys(FORM).find((key) => {
    return FORM[key].id === id;
  });
  if (!formKey) return;
  return FORM[formKey];
};

export const FORM: Record<string, CustomFormLego> = {
  SHARE_SWAP: {
    id: 'SHARE_SWAP',
    title: 'Swap Tokens for Shares',
    subtitle: 'Token Proposal',
    description: 'Exchange for voting or non-voting tokens',
    fields: [FIELD.TITLE, FIELD.DESCRIPTION, FIELD.LINK],
  },
  SIGNAL: {
    id: 'SIGNAL',
    title: 'Signal Form',
    subtitle: 'Signal Proposal',
    description: 'Ratify on chain using a DAO proposal',
    requiredFields: { title: true, description: true },
    log: true,
    tx: TX.POST_SIGNAL,
    fields: [FIELD.TITLE, FIELD.DESCRIPTION, FIELD.LINK],
  },
  ISSUE: {
    id: 'ISSUE',
    title: 'Issue DAO Tokens',
    subtitle: 'Token Proposal',
    log: true,
    description:
      'Request membership or increased stake in the DAO. Any tribute must be available in your wallet when proposal is executed.',
    tx: TX.ISSUE,
    requiredFields: {
      title: true,
      description: true,
      sharesRequested: true,
      lootRequested: true,
      recipient: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'recipient',
        type: 'input',
        label: 'Recipient',
        expectType: 'ethAddress',
        placeholder: '0x...',
      },
      {
        ...FIELD.TO_WEI,
        label: 'Voting Token Requested',
        id: 'sharesRequested',
      },
      {
        ...FIELD.TO_WEI,
        label: 'Non-Voting Token Requested',
        id: 'lootRequested',
      },
    ],
  },
  ADD_SHAMAN: {
    id: 'ADD_SHAMAN',
    title: 'Add a Shaman',
    description: 'Learn more about Shamans in our documentation.',
    subtitle: 'Add Shaman Proposal',
    requiredFields: {
      title: true,
      description: true,
      shamanAddress: true,
      shamanPermission: true,
    },
    tx: TX.ADD_SHAMAN,
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      FIELD.SHAMAN_ADDRESS,
      FIELD.SHAMAN_PERMISSIONS,
    ],
  },
  UPDATE_SHAMAN: {
    id: 'UPDATE_SHAMAN',
    title: 'Manage Shaman',
    description: 'Learn more about Shamans in our documentation.',
    subtitle: 'Manange Shaman Proposal',
    requiredFields: {
      title: true,
      description: true,
      shamanAddress: true,
      shamanPermission: true,
    },
    tx: TX.ADD_SHAMAN,
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      { ...FIELD.SHAMAN_ADDRESS, disabled: true },
      FIELD.SHAMAN_DELUXE,
    ],
  },
  TEST: {
    id: 'TEST',
    title: 'Test Form',
    subtitle: 'Test Proposal',
    description:
      'Test your proposal like a champ with this shiny new Test Form.',
    requiredFields: { title: true, description: true },
    log: true,
    tx: TX.POST_SIGNAL,
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      FIELD.REQUEST_NATIVE_TOKEN,
    ],
  },
  ISSUE_ERC20: {
    id: 'ISSUE_ERC20',
    title: 'Issue Funding (ERC20)',
    subtitle: 'Funding Proposal',
    description: 'Ask the DAO for funds.',
    log: true,
    tx: TX.ISSUE_ERC20,
    requiredFields: {
      title: true,
      description: true,
      payment: true,
      recipient: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'recipient',
        type: 'input',
        label: 'Recipient',
        info: 'Address to receive the tokens',
        placeholder: '0x...',
      },
      FIELD.REQUEST_TOKEN,
    ],
  },
  ISSUE_NETWORK_TOKEN: {
    id: 'ISSUE_NETWORK_TOKEN',
    title: 'Issue Funding (Network Token)',
    subtitle: 'Funding Proposal',
    description: 'Ask the DAO for funds.',
    log: true,
    tx: TX.ISSUE_NETWORK_TOKEN,
    requiredFields: {
      title: true,
      description: true,
      payment: true,
      recipient: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'recipient',
        type: 'input',
        label: 'Recipient',
        info: 'Address to receive the tokens',
        placeholder: '0x...',
      },
      FIELD.REQUEST_NATIVE_TOKEN,
    ],
  },
  METADATA_SETTINGS: {
    id: 'METADATA_SETTINGS',
    title: 'Update Metadata Settings',
    subtitle: 'Settings',
    requiredFields: { name: true },
    log: true,
    tx: TX.UPDATE_METADATA_SETTINGS,
    fields: [
      FIELD.NAME,
      FIELD.DESCRIPTION,
      {
        ...FIELD.DESCRIPTION,
        id: 'long_description',
        label: 'Long Description',
      },
      { ...FIELD.LINK, id: 'icon', label: 'Icon' },
      { ...FIELD.LINK, id: 'discord', label: 'Discord' },
      { ...FIELD.LINK, id: 'github', label: 'Github' },
      { ...FIELD.LINK, id: 'medium', label: 'Medium' },
      { ...FIELD.LINK, id: 'telegram', label: 'Telegram' },
      { ...FIELD.LINK, id: 'twitter', label: 'Twitter' },
      { ...FIELD.LINK, id: 'other', label: 'Other' },
      FIELD.TAGS,
    ],
  },
  UPDATE_GOV_SETTINGS: {
    id: 'UPDATE_GOV_SETTINGS',
    title: 'Update Governance Settings',
    subtitle: 'Governance Setting Proposal',
    description: 'Learn more about Governanace Settings in our documentation.',
    tx: TX.UPDATE_GOV_SETTINGS,
    requiredFields: {
      title: true,
      description: true,
      votingPeriod: true,
      gracePeriod: true,
      quorum: true,
      minRetention: true,
      sponsorThreshold: true,
      newOffering: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'timing',
        type: 'formSegment',
        title: 'Proposal Timing',
        description: 'Update your timing for Voting and Grace periods.',
        fields: [
          {
            id: 'timingSplit',
            type: 'splitColumn',
            rows: [
              {
                rowId: 'timingRows',
                left: {
                  id: 'votingPeriod',
                  type: 'timePicker',
                  label: 'Voting Period',
                  info: SUMMON_COPY.VOTING_PERIOD,
                },
                right: {
                  id: 'gracePeriod',
                  type: 'timePicker',
                  label: 'Grace Period',
                  info: SUMMON_COPY.GRACE_PERIOD,
                },
              },
            ],
          },
        ],
      },
      {
        id: 'advanced',
        type: 'formSegment',
        title: 'Advanced Governance',
        description: 'Modify some advanced governance features.',
        fields: [
          {
            id: 'advancedSplit',
            type: 'splitColumn',
            rows: [
              {
                rowId: 'row1',
                left: {
                  id: 'quorum',
                  type: 'input',
                  expectType: 'percent',
                  label: 'Quorum %',
                  placeholder: '20',
                  info: SUMMON_COPY.QUORUM,
                },
                right: {
                  id: 'minRetention',
                  type: 'input',
                  label: 'Min Retention',
                  expectType: 'percent',
                  placeholder: '66',
                  info: SUMMON_COPY.MIN_RETENTION,
                },
              },
              {
                rowId: 'row2',
                left: {
                  id: 'sponsorThreshold',
                  type: 'input',
                  expectType: 'number',
                  label: 'Sponsor Threshold',
                  placeholder: '1',
                  info: SUMMON_COPY.SPONSOR_THRESHOLD,
                },
                right: {
                  id: 'newOffering',
                  type: 'input',
                  label: 'New Offering',
                  expectType: 'number',
                  placeholder: '0',
                  info: SUMMON_COPY.NEW_OFFERING,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  TOKEN_SETTINGS: {
    id: 'TOKEN_SETTINGS',
    title: 'Change Token Settings',
    subtitle: 'Token Settings Proposal',
    description: 'Learn more about Token Settings in our documentation.',
    tx: TX.TOKEN_SETTINGS,
    requiredFields: {
      title: true,
      description: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'tokenSettings',
        type: 'formSegment',
        title: 'DAO Tokens',
        description: 'Update your token transferability',
        fields: [
          {
            id: 'split',
            type: 'splitColumn',
            rows: [
              {
                rowId: 'row1',
                left: {
                  id: 'vStake',
                  type: 'switch',
                  label: 'Transferable',
                  info: SUMMON_COPY.STAKE_TRANSFER,
                  switches: [
                    {
                      id: 'vStake',
                      fieldLabel: {
                        off: 'Not Transferable',
                        on: 'Transferable',
                      },
                    },
                  ],
                },
                right: {
                  id: 'nvStake',
                  type: 'switch',
                  label: 'Transferable',
                  info: SUMMON_COPY.NV_STAKE_TRANSFER,
                  switches: [
                    {
                      id: 'nvStake',
                      fieldLabel: {
                        off: 'Not Transferable',
                        on: 'Transferable',
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  TOKENS_FOR_SHARES: {
    id: 'TOKENS_FOR_SHARES',
    title: 'Swap Tokens for Shares',
    description:
      'Request membership or increased stake in the DAO. Any tribute must be available in your wallet when proposal is executed.',
    subtitle: 'Token Proposal',
    tx: TX.TOKENS_FOR_SHARES,
    requiredFields: {
      title: true,
      description: true,
      sharesRequested: true,
      lootRequested: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        ...FIELD.TO_WEI,
        label: 'Voting Token Requested',
        id: 'sharesRequested',
      },
      {
        ...FIELD.TO_WEI,
        label: 'Non-Voting Token Requested',
        id: 'lootRequested',
      },
      FIELD.TRIBUTE,
    ],
  },
  GUILDKICK: {
    id: 'GUILDKICK',
    title: 'Guild Kick Proposal',
    subtitle: 'Guild Kick Member',
    description:
      'Propose to exchange a member’s voting token balance with non-voting tokens. This will mean they can no longer vote on proposals once passed.',
    tx: TX.GUILDKICK,
    requiredFields: {
      title: true,
      memberAddress: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        ...FIELD.APPLICANT,
        id: 'memberAddress',
        label: 'Member',
        // @ts-expect-error: doing object spread, even if the field definition has the property
        daoMemberOnly: true,
      },
      FIELD.PROPOSAL_EXPIRY,
    ],
  },
};

export const TABULA_FORMS: Record<string, CustomFormLego> = {
  CREATE_PUBLICATION: {
    id: 'CREATE_PUBLICATION',
    title: 'Start Publication',
    subtitle: 'Publication Proposal',
    description: 'Start a new DAO publication on Tabula.gg',
    tx: TABULA_TX.CREATE_PUBLICATION,
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'pubData',
        type: 'formSegment',
        title: 'Publication Data',
        description: 'Some information about your publication.',
        fields: [
          {
            id: 'pubName',
            type: 'input',
            label: 'Publication Name',
            placeholder: 'Name',
          },
          {
            id: 'tags',
            type: 'csInput',
            label: 'Publication Name',
            placeholder: 'comma, separated, tags',
            itemNoun: {
              singular: 'tag',
              plural: 'tags',
            },
          },
          {
            id: 'pubDescription',
            type: 'textarea',
            label: 'Publication Description',
            placeholder: 'Description',
          },
          {
            id: 'pubImage',
            type: 'input',
            label: 'Publication Image',
            placeholder: 'Image URL',
            expectType: 'url',
          },
        ],
      },
    ],
  },
  CREATE_ARTICLE: {
    id: 'CREATE_ARTICLE',
    title: 'Write an Article',
    subtitle: 'Tabula Article Proposal',
    description: 'Write an article on Tabula.gg',
    log: true,
    tx: TABULA_TX.CREATE_ARTICLE,
    requiredFields: {
      title: true,
      description: true,
      articleTitle: true,
      fakeMD: true,
      pub_id: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'pubData',
        type: 'formSegment',
        title: 'Publication Data',
        description: 'Some information about your publication.',
        fields: [
          {
            id: 'articleTitle',
            type: 'input',
            label: 'Article Title',
            placeholder: "ex. 10 Signs You're a Real Champ",
          },
          // @ts-expect-error: cannot resolve nested custom field types
          FIELD.FAKE_MD,
        ],
      },
    ],
  },
};
