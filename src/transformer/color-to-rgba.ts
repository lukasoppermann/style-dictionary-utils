import { toRgba } from 'color2k'
import StyleDictionary from 'style-dictionary'
/**
 * colorToRgba
 * @description convert a token of type `color` to a rgba value
 */
export const colorToRgba: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: (token: StyleDictionary.TransformedToken) => token.$type === 'color',
  transformer: (token: StyleDictionary.TransformedToken) => toRgba(token.value)
}