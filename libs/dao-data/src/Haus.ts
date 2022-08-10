import Profile from './Profile';
import Query from './Query';

class Haus {
  query: Query;
  profile: Profile;

  private constructor() {
    this.query = new Query();
    this.profile = new Profile(this.query);
  }

  static create(): Haus {
    const hausSdk = new Haus();
    return hausSdk;
  }
}

export default Haus;
