import type { Filter, TransformedToken } from 'style-dictionary/types';
/**
 * @name isGradient
 * @type filter
 * @description only returns tokens of type `gradient`
 */
export const isGradient: Filter['filter'] = (token: TransformedToken): boolean => token?.$type === 'gradient' || token?.type === 'gradient';
