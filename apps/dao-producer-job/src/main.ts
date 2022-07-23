import { Haus } from '@daohaus/dao-data';
import { Keychain } from '@daohaus/common-utilities';
import * as Queue from 'bull';

const networks = [
  '0x1',
  '0x5',
  '0x64',
  '0xa',
  '0x89',
  '0xa4b1',
  '0xa4ec',
] as Array<keyof Keychain>;

const main = async () => {
  console.log('Start processing daos');
  const producerQueue = new Queue('dao-producer', 'redis://127.0.0.1:6379');
  const haus = Haus.create();
  for (const networkId of networks) {
    console.log(`Starting network ${networkId.toString()}`);
    const resp = await haus.query.listDaos({ networkId });
    for (const dao of resp.items) {
      console.log(`Pushing up dao ${dao.id}`);
      producerQueue.add({
        address: dao.id,
        safeAddress: dao.safeAddress,
        network: networkId,
      });
    }
  }
};

main();
