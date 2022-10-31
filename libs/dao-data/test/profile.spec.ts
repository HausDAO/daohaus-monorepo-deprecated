import { Haus } from '../src/index';

jest.mock('localforage');

describe('haus', () => {
  let haus: Haus;

  beforeAll(async () => {
    haus = await Haus.create();
  });

  it('should have a profile class', () => {
    expect(haus.profile).toBeTruthy();
  });
});
