import { CustomFormLego } from './config';
import { FIELD } from './fields';
import { TX } from './tx';

export const FORM: Record<string, CustomFormLego> = {
  SHARE_SWAP: {
    id: 'SHARE_SWAP',
    title: 'Swap Tokens for Shares',
    subtitle: 'Token Proposal',
    description:
      'Request membership or increased stake in the DAO. Any tribute must be available in your wallet when proposal is executed.',
    fields: [FIELD.TITLE, FIELD.DESCRIPTION, FIELD.LINK],
  },
  SIGNAL: {
    id: 'SIGNAL',
    title: 'Signal Form',
    subtitle: 'Signal Proposal',
    description: 'Ratify test on chain using a DAO proposal',
    requiredFields: { title: true, description: true },
    log: true,
    tx: TX.POST_SIGNAL,
    fields: [FIELD.TITLE, FIELD.DESCRIPTION, FIELD.LINK],
  },
  ISSUE: {
    id: 'ISSUE',
    title: 'Issue DAO Tokens',
    subtitle: 'Token Proposal',
    description:
      'Request membership or increased stake in the DAO. Any tribute must be available in your wallet when proposal is executed.',
    log: true,
    devtool: true,
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
        type: 'nestedArray',
        label: 'Recipient',
        placeholder: '0x...',
      },
      { ...FIELD.TO_WEI, label: 'Shares Requested', id: 'sharesRequested' },
      { ...FIELD.TO_WEI, label: 'Loot Requested', id: 'lootRequested' },
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
    fields: [FIELD.TITLE, FIELD.DESCRIPTION, FIELD.LINK, FIELD.PAYMENT],
  },
};
