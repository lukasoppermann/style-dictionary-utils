import { Transform, TransformedToken } from 'style-dictionary/types'
import { isFontFamily } from '../filter/isFontFamily.js'

const hasSpaceInName = (string: string) => /\s/g.test(string)
/**
 * fontFamilyCss
 * @description if fontFamily is an array, join it with commas and wrap font names with spaces in quotes
 */
export const fontFamilyCss: Transform = {
  name: 'fontFamily/css',
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken) => isFontFamily(token) && Array.isArray(token.value),
  transform: (token: TransformedToken) => token.value.map((string: string) => hasSpaceInName(string) ? `'${string}'` : string).join(", ")
}