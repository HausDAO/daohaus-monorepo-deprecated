import { CustomFormLego } from './config';
import { FIELD } from './fields';

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
    title: 'Test Form',
    subtitle: 'This is a test form',
    description: 'This is a test form',
    requiredFields: { title: true, description: true },
    fields: [FIELD.TITLE, FIELD.DESCRIPTION, FIELD.LINK],
  },
};
