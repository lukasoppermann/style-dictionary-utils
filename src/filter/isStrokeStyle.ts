import type { Filter, TransformedToken } from 'style-dictionary/types';
/**
 * @name isStrokeStyle
 * @type filter
 * @description only returns tokens of type `strokeStyle`
 */
export const isStrokeStyle: Filter['filter'] = (token: TransformedToken): boolean => token?.$type === 'strokeStyle' || token?.type === 'strokeStyle';
