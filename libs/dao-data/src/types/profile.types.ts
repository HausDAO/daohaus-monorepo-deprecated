import { ITransformedMembershipsQuery } from './query.types';
import { ListProfileQuery } from '../subgraph/queries-lens/profiles.generated';

export type LensProfile = ListProfileQuery['profiles']['items'][number];

export type AccountProfile = {
  address: string;
  ens?: string;
  image?: string;
  name?: string;
  description?: string;
  emoji?: string;
  lensHandle?: string;
  lensId?: string;
  daos?: ITransformedMembershipsQuery['daos'];
};
