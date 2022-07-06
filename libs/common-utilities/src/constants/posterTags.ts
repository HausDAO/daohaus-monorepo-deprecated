export type PosterTags =
  | 'daohaus.summoner.daoProfile'
  | 'daohaus.shares.daoProfile';

export const POSTER_TAGS: { [index: string]: PosterTags } = {
  summoner: 'daohaus.summoner.daoProfile',
  daoProfileUpdate: 'daohaus.shares.daoProfile',
};
