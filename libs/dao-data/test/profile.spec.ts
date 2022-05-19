import { Haus } from '../src/index';

describe('haus', () => {
  const rpcConfig = {
    '0x4': `https://${process.env['NX_RIVET_KEY']}.rinkeby.rpc.rivet.cloud`,
    '0x64': 'https://rpc.gnosischain.com',
    '0x1': `https://${process.env['NX_RIVET_KEY']}.eth.rpc.rivet.cloud`,
  };
  let haus: Haus;

  beforeAll(async () => {
    haus = await Haus.create(rpcConfig);
  });

  it('should have a profile class', () => {
    expect(haus.profile).toBeTruthy();
  });
});
