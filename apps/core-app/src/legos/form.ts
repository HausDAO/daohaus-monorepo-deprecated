import { CustomFormLego } from './config';
import { FIELD } from './fields';
import { TX } from './tx';

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
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
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
};
