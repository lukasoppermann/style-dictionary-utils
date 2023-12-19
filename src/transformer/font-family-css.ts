import type { TransformedToken, ValueTransform } from 'style-dictionary/types'
import { isFontFamily } from '../filter/isFontFamily.js'

const hasSpaceInName = (string: string) => /\s/g.test(string)
/**
 * fontFamilyCss
 * @description if fontFamily is an array, join it with commas and wrap font names with spaces in quotes
 */
export const fontFamilyCss: Omit<ValueTransform, 'name'> = {
  type: `value`,
  transitive: true,
  matcher: (token: TransformedToken) => isFontFamily(token) && Array.isArray(token.value),
  transformer: (token: TransformedToken) => token.value.map((string: string) => hasSpaceInName(string) ? `'${string}'` : string).join(", ")
}