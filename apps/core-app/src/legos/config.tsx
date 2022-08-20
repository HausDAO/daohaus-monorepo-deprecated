import { CoreFieldLookup } from '@daohaus/haus-form-builder';
import { TributeInput } from '../components/customFields/tributeInput';
import { FieldLegoBase, FormLegoBase } from '@daohaus/common-utilities';
import { ToWeiInput } from '../components/customFields/toWeiInput';
import { NestedArray } from '../components/customFields/nestedArrayInput';
import { PaymentInput } from '../components/customFields/PaymentInput';

export const CustomFields = {
  ...CoreFieldLookup,
  tributeInput: TributeInput,
  paymentInput: PaymentInput,
  toWeiInput: ToWeiInput,
  nestedArray: NestedArray,
};

export type CustomFieldLego = FieldLegoBase<typeof CustomFields>;
export type CustomFormLego = FormLegoBase<typeof CustomFields>;
