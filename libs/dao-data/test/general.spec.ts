import { Haus } from '../src/index';

describe('haus', () => {
  const rpcConfig = {
    '0x5': 'https://<somekey>.goerli.rpc.rivet.cloud',
    '0x64': 'https://rpc.gnosischain.com',
  };
  let haus: Haus;

  beforeAll(async () => {
    haus = await Haus.create({ providers: rpcConfig });
  });
  it('should init', () => {
    expect(haus.options.providers).toBeTruthy();
    if (haus.options.providers) {
      expect(haus.options.providers['0x5']).toEqual(rpcConfig['0x5']);
    }
  });

  it('should have a query class', () => {
    expect(haus.query).toBeTruthy();
  });
});
