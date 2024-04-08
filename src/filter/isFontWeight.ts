import type { Filter, TransformedToken } from 'style-dictionary/types';
/**
 * @name isFontWeight
 * @type filter
 * @description only returns tokens of type `fontWeight`
 */
export const isFontWeight: Filter['filter'] = (token: TransformedToken): boolean => token?.$type === 'fontWeight' || token?.type === 'fontWeight';
