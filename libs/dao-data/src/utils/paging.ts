import { Paging } from '../types';

export const defaultPagination: Paging = {
  pageSize: 1,
  offset: 0,
};

export interface ILightEntity {
  readonly id: string;
}

export const paginateResponse = <T>(items: T[], paging: Paging) => {
  const hasNextPage = paging.pageSize < items.length;
  return hasNextPage ? items.slice(0, paging.pageSize) : items;
};

export const createPaging = <T extends ILightEntity>(
  items: T[],
  paging: Paging
) => {
  const hasNextPage = paging.pageSize < items.length;
  const pageItems = hasNextPage ? items.slice(0, paging.pageSize) : items;

  return {
    pageItems,
    nextPaging: hasNextPage
      ? {
          pageSize: paging.pageSize,
          offset: paging.offset && paging.offset + paging.pageSize,
          lastId: paging.lastId && pageItems.slice(-1)[0]?.id,
        }
      : undefined,
    previousPaging:
      paging.offset !== undefined && paging.offset > 0
        ? {
            pageSize: paging.pageSize,
            offset: paging.offset - paging.pageSize,
          }
        : undefined,
  };
};
