import { toHex } from 'color2k'
import { alpha } from '../utilities/alpha'
import { Transform, TransformedToken } from 'style-dictionary/types'
import { isColor } from '../filter/isColor'
/**
 * colorAlphaToHex
 * @description convert a token of type `color` to a hex8 value if alpha < 1 and hex6 if alpha is 1
 */
export const colorAlphaToHex: Transform = {
  name: 'color/hexAlpha',
  type: `value`,
  transitive: true,
  filter: isColor,
  transform: (token: TransformedToken) => {
    if (token.alpha) return toHex(alpha(token.value, token.alpha))
    return toHex(token.value)
  }
}