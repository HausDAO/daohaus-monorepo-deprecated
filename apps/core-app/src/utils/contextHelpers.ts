import { Keychain, ReactSetter } from '@daohaus/common-utilities';
import {
  DaoWithTokenData,
  DaoWithTokenDataQuery,
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
  setDao: ReactSetter<DaoWithTokenDataQuery['dao'] | undefined>;
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

    if (daoRes?.data?.dao) {
      const daoData: DaoWithTokenDataQuery['dao'] = {
        tokenBalances: [],
        fiatTotal: 0,
        ...daoRes.data.dao,
      };

      setDao(daoData);
    }
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
