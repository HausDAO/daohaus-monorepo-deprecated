import { CoreFieldLookup } from '@daohaus/haus-form-builder';
import { TributeInput } from '../components/customFields/tributeInput';
import { FieldLegoBase, FormLegoBase } from '@daohaus/common-utilities';
import { ToWeiInput } from '../components/customFields/toWeiInput';
import { NestedArray } from '../components/customFields/nestedArrayInput';
import { RequestNativeToken } from '../components/customFields/RequestNativeToken';
import { RequestERC20 } from '../components/customFields/RequestERC20';
import { ShamanDeluxe } from '../components/customFields/ShamanDeluxe';

export const CustomFields = {
  ...CoreFieldLookup,
  tributeInput: TributeInput,
  toWeiInput: ToWeiInput,
  nestedArray: NestedArray,
  requestNativeToken: RequestNativeToken,
  requestERC20: RequestERC20,
  shamanPermissionDeluxe: ShamanDeluxe,
};

export type CustomFieldLego = FieldLegoBase<typeof CustomFields>;
export type CustomFormLego = FormLegoBase<typeof CustomFields>;
