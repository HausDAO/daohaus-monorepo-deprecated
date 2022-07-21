import { FieldLego } from '../types/legoTypes';

export const StandardFields: Record<string, FieldLego> = {
  Input: {
    id: 'id',
    type: 'input',
  },
  Switch: {
    id: 'id2',
    type: 'switch',
    switches: [{ fieldLabel: 'shit' }],
  },
  Check: {
    id: 'CHECK',
    type: 'switch',
    switches: [{ fieldLabel: 'Label' }],
  },
};
