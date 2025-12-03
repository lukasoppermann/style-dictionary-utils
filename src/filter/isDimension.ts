import {TransformedToken} from 'style-dictionary/types'
/**
 * @name isDimension
 * @type filter
 * @description only returns tokens of type `dimension`
 */
export const isDimensionFilter = (token: TransformedToken): boolean =>
  token?.$type === 'dimension' || token?.type === 'dimension'

export const isDimension = {
  name: 'isDimension',
  filter: isDimensionFilter,
}
