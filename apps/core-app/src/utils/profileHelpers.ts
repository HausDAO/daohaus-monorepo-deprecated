import { TDao } from '../contexts/DaoContext';

export const hasNoProfile = (dao: TDao): boolean => {
  if (!dao?.profile || !dao.profile.length) return true;
  return dao.description === '' && dao.avatarImg === '';
};
