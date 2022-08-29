import { CoreFieldLookup } from '@daohaus/haus-form-builder';
import { ProposalExpiry } from '../components/customFields/proposalExpiry';
import { TributeInput } from '../components/customFields/tributeInput';
import { FieldLegoBase, FormLegoBase } from '@daohaus/common-utilities';
import { ToWeiInput } from '../components/customFields/toWeiInput';
import { RequestNativeToken } from '../components/customFields/RequestNativeToken';
import { RequestERC20 } from '../components/customFields/RequestERC20';
import { ShamanDeluxe } from '../components/customFields/ShamanDeluxe';
import { TagsInput } from '../components/customFields/tagsInput';

export const CustomFields = {
  ...CoreFieldLookup,
  proposalExpiry: ProposalExpiry, 
  tributeInput: TributeInput,
  toWeiInput: ToWeiInput,
  requestNativeToken: RequestNativeToken,
  requestERC20: RequestERC20,
  shamanPermissionDeluxe: ShamanDeluxe,
  tagsInput: TagsInput,
};

export type CustomFieldLego = FieldLegoBase<typeof CustomFields>;
export type CustomFormLego = FormLegoBase<typeof CustomFields>;
