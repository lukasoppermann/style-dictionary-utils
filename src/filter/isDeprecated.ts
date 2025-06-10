import {TransformedToken} from 'style-dictionary/types'
/**
 * @name isDeprecated  
 * @type filter
 * @description only returns tokens with $deprecated = true or $deprecated = string
 */
export const isDeprecated = (token: TransformedToken): boolean => {
  const deprecated = token.deprecated || token.$deprecated
  return deprecated === true || typeof deprecated === 'string'
}
