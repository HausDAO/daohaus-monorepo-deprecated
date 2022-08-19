import { CoreFieldLookup } from '@daohaus/haus-form-builder';
import { TributeInput } from '../components/customFields/tributeInput';
import { FieldLegoBase, FormLegoBase } from '@daohaus/common-utilities';

export const CustomFields = {
  ...CoreFieldLookup,
  tributeInput: TributeInput,
};

export type CustomFieldLego = FieldLegoBase<typeof CustomFields>;
export type CustomFormLego = FormLegoBase<typeof CustomFields>;
