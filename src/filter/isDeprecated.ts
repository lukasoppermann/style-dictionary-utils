import {TransformedToken} from 'style-dictionary/types'
/**
 * @name isDeprecated
 * @type filter
 * @description only returns tokens with deprecated = true
 */
export const isDeprecated = (token: TransformedToken): boolean =>
  (typeof token.deprecated === 'string' && token.deprecated !== 'false') || token.deprecated === true
