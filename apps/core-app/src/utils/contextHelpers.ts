import { Keychain, ReactSetter } from '@daohaus/common-utilities';
import {
  DaoWithTokenDataQuery,
  Haus,
  ITransformedProposalListQuery,
  ListMembersQuery,
  Member_Filter,
  Member_OrderBy,
  Ordering,
  Paging,
  Proposal_Filter,
  Proposal_OrderBy,
} from '@daohaus/dao-data';

export const loadDao = async ({
  daoid,
  daochain,
  setDao,
  setDaoLoading,
  shouldUpdate,
}: {
  daoid: string;
  daochain: keyof Keychain;
  setDao: ReactSetter<DaoWithTokenDataQuery['dao'] | undefined>;
  setDaoLoading: ReactSetter<boolean>;
  shouldUpdate: boolean;
}) => {
  try {
    setDaoLoading(true);
    const haus = Haus.create();
    const daoRes = await haus.query.findDao({
      networkId: daochain,
      dao: daoid,
      includeTokens: true,
    });

    if (daoRes?.data?.dao && shouldUpdate) {
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
    if (shouldUpdate) {
      setDaoLoading(false);
    }
  }
};

export const loadMembersList = async ({
  filter,
  ordering,
  paging,
  daochain,
  setData,
  setLoading,
  setNextPaging,
  shouldUpdate,
}: {
  filter: Member_Filter;
  ordering?: Ordering<Member_OrderBy>;
  paging?: Paging;
  daochain: keyof Keychain;
  setData: ReactSetter<ListMembersQuery['members'] | undefined>;
  setLoading: ReactSetter<boolean>;
  setNextPaging: ReactSetter<Paging | undefined>;
  shouldUpdate: boolean;
}) => {
  try {
    setLoading(true);
    const haus = Haus.create();
    const res = await haus.query.listMembers({
      networkId: daochain,
      filter,
      ordering,
      paging,
    });

    if (shouldUpdate) {
      if (res.nextPaging) {
        setNextPaging(res.nextPaging);
      }

      setData((prevState) => {
        if (prevState) {
          return [...prevState, ...res.items];
        } else {
          return res.items;
        }
      });
    }
  } catch (error) {
    console.error(error);
    setData(undefined);
  } finally {
    if (shouldUpdate) {
      setLoading(false);
    }
  }
};

export const loadProposalsList = async ({
  filter,
  ordering,
  paging,
  daochain,
  setData,
  setLoading,
  setNextPaging,
  shouldUpdate,
}: {
  filter: Proposal_Filter;
  ordering?: Ordering<Proposal_OrderBy>;
  paging?: Paging;
  daochain: keyof Keychain;
  setData: ReactSetter<ITransformedProposalListQuery['proposals'] | undefined>;
  setLoading: ReactSetter<boolean>;
  setNextPaging: ReactSetter<Paging | undefined>;
  shouldUpdate: boolean;
}) => {
  try {
    setLoading(true);
    const haus = Haus.create();
    const res = await haus.query.listProposals({
      networkId: daochain,
      filter,
      ordering,
      paging,
    });

    if (shouldUpdate) {
      if (res.nextPaging) {
        setNextPaging(res.nextPaging);
      }

      setData(res.items);
    }
  } catch (error) {
    console.error(error);
    setData(undefined);
  } finally {
    if (shouldUpdate) {
      setLoading(false);
    }
  }
};
