import type { Filter, TransformedToken } from 'style-dictionary/types';
/**
 * @name isFontFamily
 * @type filter
 * @description only returns tokens of type `fontFamily`
 */
export const isFontFamily: Filter['filter'] = (token: TransformedToken): boolean => token?.$type === 'fontFamily' || token?.type === 'fontFamily';