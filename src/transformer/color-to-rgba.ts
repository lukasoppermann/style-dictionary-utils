import { toRgba } from 'color2k'
import StyleDictionary from 'style-dictionary'
import { isColor } from '../filter/isColor'
/**
 * colorToRgba
 * @description convert a token of type `color` to a rgba value
 */
export const colorToRgba: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: isColor,
  transformer: (token: StyleDictionary.TransformedToken) => toRgba(token.value)
}