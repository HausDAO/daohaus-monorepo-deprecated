import { Keychain } from '@daohaus/common-utilities';
import { Haus } from '../src/index';

describe('haus', () => {
  let haus: Haus;

  beforeAll(async () => {
    haus = await Haus.create();
  });

  it('should have a query class', () => {
    expect(haus.query).toBeTruthy();
  });
});
