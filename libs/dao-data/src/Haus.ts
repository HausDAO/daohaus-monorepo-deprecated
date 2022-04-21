import { Keychain } from '@daohaus/common-utilities';
import Query from './Query';

class Haus {
  providers!: Keychain;
  query: Query;

  private constructor(providers: Keychain) {
    this.providers = providers;
    this.query = new Query();
  }

  static create(networkConfig: Keychain): Haus {
    const hausSdk = new Haus(networkConfig);
    return hausSdk;
  }
}

export default Haus;
