import {TransformedToken} from 'style-dictionary/types'
/**
 * @name isDuration
 * @type filter
 * @description only returns tokens of type `duration`
 */
export const isDurationFilter = (token: TransformedToken): boolean => token?.$type === 'duration'

export const isDuration = {
  name: 'isDuration',
  filter: isDurationFilter,
}
