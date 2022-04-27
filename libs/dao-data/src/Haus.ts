import { Keychain } from '@daohaus/common-utilities';
import Account from './Account';
import Query from './Query';

class Haus {
  providers!: Keychain;
  query: Query;
  account: Account;

  private constructor(providers: Keychain) {
    this.providers = providers;
    this.account = new Account();
    this.query = new Query();
  }

  static create(networkConfig: Keychain): Haus {
    const hausSdk = new Haus(networkConfig);
    return hausSdk;
  }
}

export default Haus;
