import { Keychain } from '@daohaus/common-utilities';
import { ConnectNetwork } from '@self.id/web';
import Profile from './Profile';
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

  public profile(network: ConnectNetwork, node: string) {
    return new Profile(network, node, this.providers);
  }
}

export default Haus;
