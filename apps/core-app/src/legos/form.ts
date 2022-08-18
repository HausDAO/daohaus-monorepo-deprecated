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
    id: 'test',
    title: 'Signal Form',
    subtitle: 'Signal Proposal',
    description: 'Ratify test on chain using a DAO proposal',
    requiredFields: { title: true, description: true },
    tx: TX.POST_SIGNAL,
    fields: [FIELD.TITLE, FIELD.DESCRIPTION, FIELD.LINK, FIELD.TRIBUTE],
  },
};
