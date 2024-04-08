import { toRgba } from 'color2k'
import type { ValueTransform, TransformedToken } from 'style-dictionary/types'
import { isColor } from '../filter/isColor.js'
import { alpha } from '../utilities/alpha.js'
/**
 * colorAlphaToRgba
 * @description convert a token of type `color` to a rgba value
 */
export const colorAlphaToRgba: ValueTransform = {
  name: 'color/rgbAlpha',
  type: `value`,
  transitive: true,
  filter: isColor,
  transform: (token: TransformedToken) => {
    if (token.alpha !== undefined) return alpha(token.value, token.alpha)
    return toRgba(token.value)
  }
}