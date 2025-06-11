import {PlatformConfig, Transform, TransformedToken} from 'style-dictionary/types'
import {isDimension} from '../filter/isDimension.js'
import {getValue} from '../utilities/getValue.js'
/**
 * dimensionRemToPixel
 * @description convert all dimensions that use rem value to pixels, uses `platform.options.basePxFontSize`
 * as the base font, or `16` if not provided
 */
export const dimensionRemToPixel: Transform = {
  name: 'dimension/remToPixel',
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken) => {
    const tokenValue = getValue<string>(token)
    return isDimension(token) && tokenValue.substring(tokenValue.length - 3) === 'rem'
  },
  transform: (token: TransformedToken, platform: PlatformConfig | undefined) => {
    const tokenValue = getValue<string>(token)
    const baseFont = platform?.basePxFontSize || 16
    const floatVal = parseFloat(tokenValue)

    if (isNaN(floatVal)) {
      throw `Invalid Number: '${token.name}: ${tokenValue}' is not a valid number, cannot transform to rem \n`
    }

    if (floatVal === 0) {
      return '0'
    }

    return `${baseFont * floatVal}px`
  },
}
