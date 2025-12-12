import {TransformedToken} from 'style-dictionary/types'
/**
 * @name isDeprecated
 * @type filter
 * @description only returns tokens with $deprecated = true or $deprecated = string
 */
export const isDeprecatedFilter = (token: TransformedToken): boolean => {
  const deprecated = token.$deprecated
  return deprecated === true || typeof deprecated === 'string'
}

export const isDeprecated = {
  name: 'isDeprecated',
  filter: isDeprecatedFilter,
}
