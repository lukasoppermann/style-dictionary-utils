import { toHex } from 'color2k'
import StyleDictionary from 'style-dictionary'
/**
 * colorToHex
 * @description convert a token of type `color` to a hex value
 */
export const colorToHex: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: (token: StyleDictionary.TransformedToken) => token.$type === 'color',
  transformer: (token: StyleDictionary.TransformedToken) => toHex(token.value)
}