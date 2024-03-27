import type { TransformedToken } from 'style-dictionary/types';
/**
 * @name isDimension
 * @type filter
 * @description only returns tokens of type `dimension`
 */
export const isDimension = (token: TransformedToken): boolean => token?.$type === 'dimension' || token?.type === 'dimension';
