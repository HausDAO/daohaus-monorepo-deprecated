import { IHausOptions } from './types';
import Profile from './Profile';
import Query from './Query';

class Haus {
  options: IHausOptions;
  query: Query;
  profile: Profile;

  private constructor(options: IHausOptions) {
    this.options = options;
    this.query = new Query();
    this.profile = new Profile(
      this.options.providers,
      this.options.ceramicNode
    );
  }

  static create(options: IHausOptions = {}): Haus {
    const hausSdk = new Haus(options);
    return hausSdk;
  }
}

export default Haus;
