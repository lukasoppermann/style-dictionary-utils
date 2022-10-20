import StyleDictionary from 'style-dictionary'
import { isFontFamily } from '../filter/isFontFamily'

const hasSpaceInName = (string: string) => /\s/g.test(string)
/**
 * fontFamilyCss
 * @description if fontFamily is an array, join it with commas and wrap font names with spaces in quotes
 */
export const fontFamilyCss: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: (token: StyleDictionary.TransformedToken) => isFontFamily(token) && Array.isArray(token.value),
  transformer: (token: StyleDictionary.TransformedToken) => token.value.map((string: string) => hasSpaceInName(string) ? `'${string}'` : string).join(", ")
}