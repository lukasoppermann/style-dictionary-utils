import type { Filter, TransformedToken } from 'style-dictionary/types';
/**
 * @name isTypographic
 * @type filter
 * @description only returns tokens of type `typography`, `fontFamily`
 */
export const isTypographic: Filter['filter'] = (token: TransformedToken): boolean => ['typography', 'fontWeight', 'fontFamily'].includes(token?.$type ?? token?.type ?? '');
