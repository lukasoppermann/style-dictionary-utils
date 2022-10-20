import { toHex } from 'color2k'
import StyleDictionary from 'style-dictionary'
import { isColor } from '../filter/isColor'
/**
 * colorToHex
 * @description convert a token of type `color` to a hex value
 */
export const colorToHex: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: isColor,
  transformer: (token: StyleDictionary.TransformedToken) => toHex(token.value)
}