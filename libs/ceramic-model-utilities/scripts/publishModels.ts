const { DID } = await import('dids');
const { Ed25519Provider } = await import('key-did-provider-ed25519');
import { writeFile } from 'node:fs/promises';
const { CeramicClient } = await import('@ceramicnetwork/http-client');
const { ModelManager } = await import('@glazed/devtools');
const { getResolver } = await import('key-did-resolver');
import { fromString } from 'uint8arrays';
import vaultSchema from '../schemas/vault.json';

// The key must be provided as an environment variable
const key = fromString(process.env['SEED'], 'base16');
const CLIENT_URL = process.env.CLIENT_URL;
// Create and authenticate the DID
const did = new DID({
  provider: new Ed25519Provider(key),
  resolver: getResolver(),
});

const main = async () => {
  const ceramic = new CeramicClient(CLIENT_URL);
  ceramic.did = did;

  await did.authenticate();
  const manager = new ModelManager({ ceramic: ceramic });

  const publicationSchemaID = await manager.createSchema(
    'Publication',
    vaultSchema
  );
  await manager.createDefinition('publication', {
    name: 'My publication',
    description: 'A newsletter publication',
    schema: manager.getSchemaURL(publicationSchemaID),
  });
  await manager.createTile(
    'examplePublication',
    {
      name: 'Example',
      about: 'Example publication',
    },
    { schema: manager.getSchemaURL(publicationSchemaID) }
  );
  const model = await manager.deploy();
  await writeFile('./src/published/vault.json', JSON.stringify(model));
};

main();
