import { toRgba } from 'color2k'
import StyleDictionary from 'style-dictionary'
import { isColor } from '../filter/isColor'
import { alpha } from '../utilities/alpha'
/**
 * colorAlphaToRgba
 * @description convert a token of type `color` to a rgba value
 */
export const colorAlphaToRgba: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: isColor,
  transformer: (token: StyleDictionary.TransformedToken) => {
    if (token.alpha !== undefined) return alpha(token.value, token.alpha)
    return toRgba(token.value)
  }
}