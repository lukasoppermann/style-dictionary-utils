import {TransformedToken} from 'style-dictionary/types'
/**
 * @name isTypographic
 * @type filter
 * @description only returns tokens of type `typography`, `fontFamily`
 */
export const isTypographic = (token: TransformedToken): boolean =>
  ['typography', 'fontWeight', 'fontFamily'].includes(token?.$type ?? token?.type ?? '')
