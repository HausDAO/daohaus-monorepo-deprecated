import { Member_Filter } from '@daohaus/dao-data';
import { FILTER_TYPE } from './constants';

export const getDelegateFilter = (
  filterDelegate: string,
  address: string
): Member_Filter | undefined => {
  if (filterDelegate === '') {
    return undefined;
  }
  if (filterDelegate === FILTER_TYPE.DELEGATING) {
    return { delegateOfCount_gt: '0' };
  }
  if (filterDelegate === FILTER_TYPE.DELEGATING_TO) {
    return { delegatingTo_not: address };
  }
};
