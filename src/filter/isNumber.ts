import {TransformedToken} from 'style-dictionary/types'
/**
 * @name isNumber
 * @type filter
 * @description only returns tokens of type `number`
 */
export const isNumberFilter = (token: TransformedToken): boolean => token?.$type === 'number'

export const isNumber = {
  name: 'isNumber',
  filter: isNumberFilter,
}
