import { Haus } from '@daohaus/dao-data';
import { Keychain, DAO_PRODUCER_QUEUE } from '@daohaus/common-utilities';
import * as Queue from 'bull';

const REDIS_HOST = process.env.SLEEP_TIME || 'redis://127.0.0.1:6379';

// 1. Calculate active proposals
//   - active proposals comes from subgraph

const producerQueue = new Queue(DAO_PRODUCER_QUEUE);
const runner = async (data: {
  address: string;
  safeAddress: string;
  networkId: keyof Keychain;
}) => {
  const haus = Haus.create();
  const balance = await haus.query.listTokenBalances({
    networkId: data.networkId,
    safeAddress: data.safeAddress,
  });
  // create ceramic document to store data
  //
  return data;
};

producerQueue.process(async (message) => {
  return await runner(message.data);
});

producerQueue.on('completed', (job, result) => {
  console.log(`Job completed with result ${result}`);
});
