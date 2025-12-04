import {TransformedToken} from 'style-dictionary/types'
/**
 * @name isColor
 * @type filter
 * @description only returns tokens of type `color`
 */
export const isColorFilter = (token: TransformedToken): boolean => token?.$type === 'color'

export const isColor = {
  name: 'isColor',
  filter: isColorFilter,
}
