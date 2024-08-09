import { TransformedToken } from 'style-dictionary/types';
/**
 * @name isCubicBezier
 * @type filter
 * @description only returns tokens of type `cubicBezier`
 */
export const isCubicBezier = (token: TransformedToken): boolean => token?.$type === 'cubicBezier' || token?.type === 'cubicBezier';
