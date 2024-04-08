import { toHex } from 'color2k'
import type { ValueTransform, TransformedToken } from 'style-dictionary/types'
import { isColor } from '../filter/isColor.js'
/**
 * colorToHex
 * @description convert a token of type `color` to a hex value
 */
export const colorToHex: ValueTransform = {
  name: 'color/hex',
  type: `value`,
  transitive: true,
  filter: isColor,
  transform: (token: TransformedToken) => toHex(token.value)
}