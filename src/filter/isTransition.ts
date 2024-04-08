import type { Filter, TransformedToken } from 'style-dictionary/types';
/**
 * @name isTransition
 * @type filter
 * @description only returns tokens of type `transition`
 */
export const isTransition: Filter['filter'] = (token: TransformedToken): boolean => token?.$type === 'transition' || token?.type === 'transition';
