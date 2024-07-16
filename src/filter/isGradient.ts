import { TransformedToken } from 'style-dictionary/types';
/**
 * @name isGradient
 * @type filter
 * @description only returns tokens of type `gradient`
 */
export const isGradient = (token: TransformedToken): boolean => token?.$type === 'gradient' || token?.type === 'gradient';
