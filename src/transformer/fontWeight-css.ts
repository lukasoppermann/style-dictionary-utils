import {Transform, TransformedToken} from 'style-dictionary/types'
import {isFontWeightFilter} from '../filter/isFontWeight.js'
import {getValue} from '../utilities/getValue.js'
/**
 * Acceptable font weights according to w3c standard
 * @link https://design-tokens.github.io/community-group/format/#font-weight
 */
const fontWeights: {[key: string]: number} = {
  thin: 100,
  hairline: 100,
  'extra-light': 200,
  'ultra-light': 200,
  extralight: 200,
  ultralight: 200,
  light: 300,
  normal: 400,
  regular: 400,
  book: 400,
  medium: 500,
  'semi-bold': 600,
  'demi-bold': 600,
  semibold: 600,
  demibold: 600,
  bold: 700,
  'extra-bold': 800,
  'ultra-bold': 800,
  extrabold: 800,
  ultrabold: 800,
  black: 900,
  heavy: 900,
  'extra-black': 950,
  'ultra-black': 950,
  extrablack: 950,
  ultrablak: 950,
}

export type FontWeightString = keyof typeof fontWeights
export type FontWeightNumeric = (typeof fontWeights)[FontWeightString]

export const fontWeightValueTransformer = (tokenValue: FontWeightNumeric | FontWeightString): FontWeightNumeric => {
  const numericFontWeights = Array.from(new Set(Object.values(fontWeights)))
  const stringFontWeights = Object.keys(fontWeights)
  // check if value is not a string
  if (typeof tokenValue === 'number' && !numericFontWeights.includes(tokenValue)) {
    throw `Invalid Font Weight: '${tokenValue}' is not a valid font weight number value. Valid values are: ${numericFontWeights.join(', ')} \n`
  }
  if (typeof tokenValue === 'string' && !stringFontWeights.includes(tokenValue)) {
    throw `Invalid Font Weight: '${tokenValue}' is not a valid font weight string value. Valid values are: ${stringFontWeights.join(', ')} \n`
  }

  if (typeof tokenValue === 'string' && fontWeights[tokenValue]) {
    return fontWeights[tokenValue] as FontWeightNumeric
  }

  return tokenValue as FontWeightNumeric
}

/**
 * fontWeightCss
 * @description convert a fontWeight string like `black` to the corresponding number, like `900`
 */
export const fontWeightCss: Transform = {
  name: 'fontWeight/css',
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken) => isFontWeightFilter(token),
  transform: (token: TransformedToken) => {
    const tokenValue = getValue<FontWeightNumeric | FontWeightString>(token)

    return fontWeightValueTransformer(tokenValue)
  },
}
