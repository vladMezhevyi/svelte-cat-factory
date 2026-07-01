import { catTypes } from '$lib/constants/cat.constants';
import type { CatType } from '$lib/types/cat';

export const isCatTypeValid = (type: CatType | string | undefined | null): type is CatType => {
  if (!type) return false;
  return catTypes.includes(type.trim().toLowerCase() as CatType);
};
