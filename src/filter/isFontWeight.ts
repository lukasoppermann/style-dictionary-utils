import {TransformedToken} from 'style-dictionary/types'
/**
 * @name isFontWeight
 * @type filter
 * @description only returns tokens of type `fontWeight`
 */
export const isFontWeight = (token: TransformedToken): boolean =>
  token?.$type === 'fontWeight' || token?.type === 'fontWeight'
