import { Keychain, ReactSetter } from '@daohaus/common-utilities';
import { DaoWithTokenData, FindDaoQuery, Haus } from '@daohaus/dao-data';

export const loadDao = async ({
  daoid,
  daochain,
  setDao,
  setDaoLoading,
  shouldUpdate,
}: {
  daoid: string;
  daochain: keyof Keychain;
  setDao: ReactSetter<FindDaoQuery | DaoWithTokenData | undefined>;
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

    setDao(daoRes.data);
  } catch (error) {
    console.error(error);
    setDao(undefined);
  } finally {
    if (shouldUpdate) {
      setDaoLoading(false);
    }
  }
};
