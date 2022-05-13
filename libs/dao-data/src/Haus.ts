import { Keychain } from '@daohaus/common-utilities';
import { ConnectNetwork } from '@self.id/web';
import Profile from './Profile';
import Query from './Query';

class Haus {
  providers!: Keychain;
  query: Query;
  profile: Profile;

  private constructor(providers: Keychain) {
    this.providers = providers;
    this.query = new Query();
    this.profile = new Profile(providers);
  }

  static create(networkConfig: Keychain): Haus {
    const hausSdk = new Haus(networkConfig);
    return hausSdk;
  }
}

export default Haus;
