import {Transform, TransformedToken} from 'style-dictionary/types'
import {isFontWeight} from '../filter/isFontWeight.js'
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
  ultrablack: 950,
}
/**
 * fontWeightToNumber
 * @description convert a fontWeight string like `black` to the corresponding number, like `900`
 */
export const fontWeightToNumber: Transform = {
  name: 'fontWeight/number',
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken) => isFontWeight.filter(token),
  transform: (token: TransformedToken) => {
    const tokenValue = getValue<string>(token)
    // check if value is not a string
    if (typeof tokenValue !== 'string') return tokenValue
    // check if value exists in matrix
    const fromMatrix = fontWeights[tokenValue.toLowerCase()]
    if (fromMatrix !== undefined) return fromMatrix
    // test if value is quoted int
    const valueAsInt = parseInt(tokenValue.toLowerCase())
    if (Number.isInteger(valueAsInt)) return valueAsInt
    //
    return tokenValue
  },
}
