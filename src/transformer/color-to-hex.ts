import { toHex } from 'color2k'
import type { ValueTransform, TransformedToken } from 'style-dictionary/types'
import { isColor } from '../filter/isColor.js'
/**
 * colorToHex
 * @description convert a token of type `color` to a hex value
 */
export const colorToHex: Omit<ValueTransform, 'name'> = {
  type: `value`,
  transitive: true,
  matcher: isColor,
  transformer: (token: TransformedToken) => toHex(token.value)
}