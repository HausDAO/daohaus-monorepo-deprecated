import { Keychain, ReactSetter } from '@daohaus/common-utilities';
import {
  DaoWithTokenData,
  FindDaoQuery,
  Haus,
  ITransformedProposalListQuery,
  ListMembersQuery,
} from '@daohaus/dao-data';

export const loadDao = async ({
  daoid,
  daochain,
  setDao,
  setDaoLoading,
}: {
  daoid: string;
  daochain: keyof Keychain;
  setDao: ReactSetter<FindDaoQuery['dao'] | DaoWithTokenData | undefined>;
  setDaoLoading: ReactSetter<boolean>;
}) => {
  try {
    setDaoLoading(true);
    const haus = Haus.create();
    const daoRes = await haus.query.findDao({
      networkId: daochain,
      dao: daoid,
      includeTokens: true,
    });

    setDao(daoRes?.data?.dao);
  } catch (error) {
    console.error(error);
    setDao(undefined);
  } finally {
    setDaoLoading(false);
  }
};

export const loadMembersList = async ({
  daoid,
  daochain,
  setData,
  setLoading,
}: {
  daoid: string;
  daochain: keyof Keychain;
  setData: ReactSetter<ListMembersQuery['members'] | undefined>;
  setLoading: ReactSetter<boolean>;
}) => {
  try {
    setLoading(true);
    const haus = Haus.create();
    const res = await haus.query.listMembers({
      networkId: daochain,
      filter: { dao: daoid },
    });

    setData(res.items);
  } catch (error) {
    console.error(error);
    setData(undefined);
  } finally {
    setLoading(false);
  }
};

export const loadProposalsList = async ({
  daoid,
  daochain,
  setData,
  setLoading,
}: {
  daoid: string;
  daochain: keyof Keychain;
  setData: ReactSetter<ITransformedProposalListQuery['proposals'] | undefined>;
  setLoading: ReactSetter<boolean>;
}) => {
  try {
    setLoading(true);
    const haus = Haus.create();
    const res = await haus.query.listProposals({
      networkId: daochain,
      filter: { dao: daoid },
    });

    setData(res.items);
  } catch (error) {
    console.error(error);
    setData(undefined);
  } finally {
    setLoading(false);
  }
};
