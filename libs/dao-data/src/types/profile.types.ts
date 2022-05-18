export type BasicProfile = {
  image?: string;
  name?: string;
  description?: string;
  emoji?: string;
  background?: string;
};

export type AccountProfile = {
  address: string;
  ens: string | null;
  image?: string;
  name?: string;
  description?: string;
  emoji?: string;
  background?: string;
};
