import { Haus } from '@daohaus/dao-data';
const { TileDocument } = await import('@ceramicnetwork/stream-tile');
import { Keychain, DAO_PRODUCER_QUEUE } from '@daohaus/common-utilities';
const { vaultModel } = await import('@daohaus/ceramic-model-utilities');
const { WebClient } = await import('@self.id/web');
import { fromString } from 'uint8arrays';
const { DID } = await import('dids');
const { getResolver } = await import('key-did-resolver');
const { Ed25519Provider } = await import('key-did-provider-ed25519');
import * as Queue from 'bull';

const CERAMIC_NODE = process.env.CERAMIC_NODE || 'http://localhost:7007';
const CERAMIC_NETWORK = (process.env.CERAMIC_NETWORK || 'testnet-clay') as
  | 'dev-unstable'
  | 'mainnet'
  | 'testnet-clay';
const key = fromString(process.env['SEED'], 'base16');
const did = new DID({
  provider: new Ed25519Provider(key),
  resolver: getResolver(),
});

const producerQueue = new Queue.default(DAO_PRODUCER_QUEUE);
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
  const client = new WebClient({
    ceramic: CERAMIC_NODE,
    connectNetwork: CERAMIC_NETWORK,
  });
  client.ceramic.did = did;
  await did.authenticate();
  await TileDocument.create(
    client.ceramic,
    {
      safeAddress: balance.data.safeAddress,
      fiatTotal: balance.data.fiatTotal,
      tokenBalances: balance.data.tokenBalances,
    },
    {
      controllers: [did.id],
      family: 'daoVault',
      tags: [data.address],
      schema: vaultModel.definitions.vault,
      deterministic: true,
    }
  );
  return data;
};

producerQueue.process(async (message) => {
  return await runner(message.data);
});

producerQueue.on('completed', (job, result) => {
  console.log(`Job completed with result ${result}`);
});
