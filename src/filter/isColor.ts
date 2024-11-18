import {TransformedToken} from 'style-dictionary/types'
/**
 * @name isColor
 * @type filter
 * @description only returns tokens of type `color`
 */
export const isColor = (token: TransformedToken): boolean => token?.$type === 'color' || token?.type === 'color'
