import { FieldLego } from '../types/legoTypes';

export const StandardFields: Record<string, FieldLego> = {
  Input: {
    id: 'id',
    label: 'Label',
    type: 'input',
  },
  Switch: {
    id: 'id2',
    label: 'Label',
    type: 'switch',
    switches: [{ fieldLabel: 'shit' }],
  },
};
