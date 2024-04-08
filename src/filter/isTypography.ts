import type { Filter, TransformedToken } from 'style-dictionary/types';
/**
 * @name isTypography
 * @type filter
 * @description only returns tokens of type `typography`
 */
export const isTypography: Filter['filter'] = (token: TransformedToken): boolean => token?.$type === 'typography' || token?.type === 'typography';
