import { catFilters, catTypes } from '$lib/constants/cat.constants';
import type { CatFilter, CatType } from '$lib/types/cat.types';

export const isCatTypeValid = (type: CatType | string | undefined | null): type is CatType => {
  if (!type) return false;
  return catTypes.includes(type.trim().toLowerCase() as CatType);
};

export const isCatFilterValid = (
  filter: CatFilter | string | undefined | null
): filter is CatFilter => {
  if (!filter) return false;
  return catFilters.includes(filter.trim().toLowerCase() as CatFilter);
};
