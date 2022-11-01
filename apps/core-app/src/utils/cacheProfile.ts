import * as localforage from 'localforage';
import {
  AccountProfile,
  ArbitraryState,
  CACHE_CONFIG,
  CacheStoreName,
  getlocalForage,
} from '@daohaus/common-utilities';
import {
  Dao_Filter,
  Haus,
  ICrossNetworkMemberListArguments,
  Member_Filter,
  Member_OrderBy,
} from '@daohaus/dao-data';

export const getProfileStore = async () =>
  (await getlocalForage(CacheStoreName.MEMBERS_PROFILE)) as ArbitraryState;

export const getCachedProfile = async ({ address }: { address: string; }) => {
  const abiStore = await getProfileStore();
  const profile = abiStore?.[address] as AccountProfile | undefined;
  return profile;
};

const addProfile = ({
  profileStore,
  address,
  profile,
}: {
  profileStore: ArbitraryState;
  address: string;
  profile: AccountProfile;
}) => {
  return {
    ...profileStore,
    [address]: {
      ...profileStore[address],
      ...profile,
       // This could be used to expire cache periodically and update profiles
      lastUpdated: new Date().getTime(),
    },
  };
};

export const cacheProfile = async ({
  address,
  profile,
}: {
  address: string;
  profile: AccountProfile;
}) => {
  const profileStore = await getProfileStore();
  const newStore = addProfile({
    profileStore,
    address,
    profile,
  });
  try {
    await localforage.setItem(CacheStoreName.MEMBERS_PROFILE, newStore);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const fetchProfile = async ({
  haus,
  address,
  includeDaosOptions,
} : {
  haus: Haus,
  address: string;
  includeDaosOptions?: Omit<
    ICrossNetworkMemberListArguments<
      Member_OrderBy,
      Dao_Filter,
      Member_Filter
    >,
    'memberAddress'
  >;
}): Promise<AccountProfile> => {
  const cachedProfile = await getCachedProfile({ address });
  if (cachedProfile) return cachedProfile;
  const profile = await haus.profile.get({ address, includeDaosOptions });
  cacheProfile({
    address,
    profile,
  });
  return profile;
};

const initProfilesStore = async () => {
  localforage.config(CACHE_CONFIG);
  const store = await getProfileStore();
  if (!store) {
    localforage.setItem(CacheStoreName.MEMBERS_PROFILE, {});
  }
};

initProfilesStore();
