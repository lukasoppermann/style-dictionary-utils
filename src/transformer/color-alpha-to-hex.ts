import { toHex } from 'color2k'
import type { ValueTransform, TransformedToken } from 'style-dictionary/types'
import { alpha } from '../utilities/alpha.js'
import { isColor } from '../filter/isColor.js'
/**
 * colorAlphaToHex
 * @description convert a token of type `color` to a hex8 value if alpha < 1 and hex6 if alpha is 1
 */
export const colorAlphaToHex: Omit<ValueTransform, 'name'> = {
  type: `value`,
  transitive: true,
  matcher: isColor,
  transformer: (token: TransformedToken) => {
    if (token.alpha) return toHex(alpha(token.value, token.alpha))
    return toHex(token.value)
  }
}