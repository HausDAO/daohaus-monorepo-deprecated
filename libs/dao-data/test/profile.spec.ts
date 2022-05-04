import { Haus } from '../src/index';

describe('haus', () => {
  console.log('process.env', process.env['NX_RIVET_KEY']);
  const rpcConfig = {
    '0x4': `https://${process.env['NX_RIVET_KEY']}rinkeby.rpc.rivet.cloud`,
    '0x64': 'https://rpc.gnosischain.com',
    '0x1': `https://${process.env['NX_RIVET_KEY']}eth.rpc.rivet.cloud`,
  };
  let haus: Haus;

  beforeAll(async () => {
    haus = await Haus.create(rpcConfig);
  });

  it('should have a profile class', () => {
    expect(haus.profile).toBeTruthy();
  });

  it('should have a profile', async () => {
    const profile = await haus.profile.get(
      '0x83aB8e31df35AA3281d630529C6F4bf5AC7f7aBF'
    );
    console.log(profile);
    expect(profile.ens).toBe('samkuhlmann.eth');
  });
});
