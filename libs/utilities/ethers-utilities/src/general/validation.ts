import { isEthAddress, toBaseUnits } from './helpers';
import { ValidateField } from '@daohaus/common-utilities';

export const ValErrMsgs = {
  ethAddress: 'Field must be an Ethereum address',
};
export const EthersValidateField = {
  ethAddress: (val: string) =>
    isEthAddress(val) ? true : ValErrMsgs.ethAddress,
  ...ValidateField,
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleBaseUnits = (val: any, decimals = 18) =>
  ValidateField.number(val) === true ? toBaseUnits(val, decimals) : val;
