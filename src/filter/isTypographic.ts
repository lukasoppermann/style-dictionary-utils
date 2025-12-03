import {TransformedToken} from 'style-dictionary/types'
/**
 * @name isTypographic
 * @type filter
 * @description only returns tokens of type `typography`, `fontFamily`
 */
export const isTypographicFilter = (token: TransformedToken): boolean =>
  ['typography', 'fontWeight', 'fontFamily'].includes(token?.$type ?? token?.type ?? '')

export const isTypographic = {
  name: 'isTypographic',
  filter: isTypographicFilter,
}
