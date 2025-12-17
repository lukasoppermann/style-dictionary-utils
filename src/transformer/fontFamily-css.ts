import {Transform, TransformedToken} from 'style-dictionary/types'
import {isFontFamilyFilter} from '../filter/isFontFamily.js'
import {getValue} from '../utilities/getValue.js'

const hasSpaceInName = (string: string) => /\s/g.test(string)

export const fontFamilyValueTransformer = (value: string | string[]): string => {
  // if the value is not an array, return it as is
  if (!Array.isArray(value)) return value
  // if the value is an array, join it with commas
  return value.map((string: string) => (hasSpaceInName(string) ? `'${string}'` : string)).join(', ')
}
/**
 * fontFamilyCss
 * @description if fontFamily is an array, join it with commas and wrap font names with spaces in quotes
 */
export const fontFamilyCss: Transform = {
  name: 'fontFamily/css',
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken) => isFontFamilyFilter(token),
  transform: (token: TransformedToken) => {
    const tokenValue = getValue<string | string[]>(token)

    return fontFamilyValueTransformer(tokenValue)
  },
}
