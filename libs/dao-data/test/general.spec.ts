import { Haus } from '../src/index';

describe('haus', () => {
  const rpcConfig = {
    '0x4': 'https://<somekey>.rinkeby.rpc.rivet.cloud',
    '0x64': 'https://rpc.gnosischain.com',
  };
  let haus: Haus;

  beforeAll(async () => {
    haus = await Haus.create(rpcConfig);
  });
  it('should init', () => {
    expect(haus.providers['0x4']).toEqual(rpcConfig['0x4']);
  });

  it('should have a query class', () => {
    expect(haus.query).toBeTruthy();
  });
});
