import { toRgba } from 'color2k'
import StyleDictionary from 'style-dictionary'
import { alpha } from '../utilities/alpha'
/**
 * colorAlphaToRgba
 * @description convert a token of type `color` to a rgba value if alpha < 1 and hex6 if alpha is 1
 */
export const colorAlphaToRgba: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: (token: StyleDictionary.TransformedToken) => token.$type === 'color',
  transformer: (token: StyleDictionary.TransformedToken) => {
    if (token.alpha) return alpha(token.value, token.alpha)
    return toRgba(token.value)
  }
}