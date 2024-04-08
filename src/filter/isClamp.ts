import type { Filter, TransformedToken } from 'style-dictionary/types';
/**
 * @name isClamp
 * @type filter
 * @description only returns tokens of type `shadow`
 */
export const isClamp: Filter['filter'] = (token: TransformedToken): boolean => (token?.$type === 'clamp' || token?.type === 'clamp') && typeof token.value === 'object' && "min" in token.value && "ideal" in token.value && "max" in token.value;
