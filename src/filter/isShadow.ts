import {TransformedToken} from 'style-dictionary/types'
/**
 * @name isShadow
 * @type filter
 * @description only returns tokens of type `shadow`
 */
export const isShadowFilter = (token: TransformedToken): boolean => token?.$type === 'shadow'

export const isShadow = {
  name: 'isShadow',
  filter: isShadowFilter,
}
