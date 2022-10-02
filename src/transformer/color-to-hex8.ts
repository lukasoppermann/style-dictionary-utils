import { toHex, transparentize } from 'color2k'
import StyleDictionary from 'style-dictionary'
/**
 * colorToHex8
 * @description convert a token of type `color` to a hex8 value if alpha < 1 and hex6 if alpha is 1
 */
export const colorToHex8: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: (token: StyleDictionary.TransformedToken) => token.$type === 'color',
  transformer: (token: StyleDictionary.TransformedToken) =>
    toHex(transparentize(token.value, 1 - token.alpha || 0))
}