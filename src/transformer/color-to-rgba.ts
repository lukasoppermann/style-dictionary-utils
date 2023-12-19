import { toRgba } from 'color2k'
import type { ValueTransform, TransformedToken } from 'style-dictionary/types'
import { isColor } from '../filter/isColor.js'
/**
 * colorToRgba
 * @description convert a token of type `color` to a rgba value
 */
export const colorToRgba: Omit<ValueTransform, 'name'> = {
  type: `value`,
  transitive: true,
  matcher: isColor,
  transformer: (token: TransformedToken) => toRgba(token.value)
}