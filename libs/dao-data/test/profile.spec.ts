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

  it('should have a profile', async () => {
    const profile = await haus.profile.get(
      '0x83aB8e31df35AA3281d630529C6F4bf5AC7f7aBF'
    );
    expect(profile.ens).toBe('samkuhlmann.eth');
  });

  // TODO: Setup profile
  it('should have a a ceramic profile', async () => {
    const profile = await haus.profile.get(
      '0xEAC5F0d4A9a45E1f9FdD0e7e2882e9f60E301156'
    );
    expect(profile.name).toBeTruthy();
  });
});
