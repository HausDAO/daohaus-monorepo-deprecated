import { ITransformedMembershipsQuery } from './query.types';

type BasicProfileImage = {
  original: {
    src: string;
    width: number;
    height: number;
    mimeType: string;
    size: number;
  };
};

export type BasicProfile = {
  image?: BasicProfileImage;
  name?: string;
  description?: string;
  emoji?: string;
};

export type AccountProfile = {
  address: string;
  ens: string | null;
  image?: string;
  name?: string;
  description?: string;
  emoji?: string;
  daos?: ITransformedMembershipsQuery['daos'];
};
