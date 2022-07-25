import { Haus } from '@daohaus/dao-data';
import { Keychain } from '@daohaus/common-utilities';
import * as Queue from 'bull';

const SLEEP_TIME = parseInt(process.env.SLEEP_TIME) || 300;
const REDIS_HOST = process.env.SLEEP_TIME || 'redis://127.0.0.1:6379';

// TODO: Commented out networks are invalid
const networks = [
  // '0x1',
  '0x5',
  // '0x64',
  // '0xa',
  // '0x89',
  // '0xa4b1',
  // '0xa4ec',
] as Array<keyof Keychain>;

// sleep time expects milliseconds
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const main = async () => {
  console.log('Start processing daos');
  const producerQueue = new Queue('dao-producer', REDIS_HOST);
  try {
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
  } catch (e) {
    console.error(e);
  }
};

const runner = async () => {
  while (true) {
    await main();
    await sleep(SLEEP_TIME * 1000);
  }
};

runner();
