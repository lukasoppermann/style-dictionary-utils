import {TransformedToken} from 'style-dictionary/types'
/**
 * @name isDeprecated
 * @type filter
 * @description only returns tokens with deprecated = true
 */
export const isDeprecated = (token: TransformedToken): boolean => {
  const deprecated = token.deprecated || token.$deprecated
  return (typeof deprecated === 'string' && deprecated !== 'false') || deprecated === true
}
