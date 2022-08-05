import { ValidNetwork } from '@daohaus/common-utilities';
import { Haus } from '@daohaus/dao-data';


export const fetchDaos = async (networkId: ValidNetwork, safeAddress: string) => {
  const haus = Haus.create();
  const query = await haus.query.listDaos({
    networkId,
    filter: { safeAddress },
  });
  if (query.error) {
    console.error('An error has occurred', query.error)
  }
  return query.items;
};
