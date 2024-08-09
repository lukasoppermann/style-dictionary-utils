import { TransformedToken } from 'style-dictionary/types';
/**
 * @name isBorder
 * @type filter
 * @description only returns tokens of type `border`
 */
export const isBorder = (token: TransformedToken): boolean => token?.$type === 'border' || token?.type === 'border';
