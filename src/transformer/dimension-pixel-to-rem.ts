import {PlatformConfig, Transform, TransformedToken} from 'style-dictionary/types'
import {isDimension} from '../filter/isDimension.js'
import {getDimensionValue} from '../utilities/getDimensionValue.js'

/**
 * dimensionPixelToRem
 * @description convert all dimensions that use pixel value to rem, uses `platform.options.basePxFontSize`
 * as the base font, or `16` if not provided
 */
export const dimensionPixelToRem: Transform = {
  name: 'dimension/pixelToRem',
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken) => {
    const dimensionValue = getDimensionValue(token)
    return isDimension.filter(token) && dimensionValue.substring(dimensionValue.length - 2) === 'px'
  },
  transform: (token: TransformedToken, platform: PlatformConfig | undefined) => {
    const dimensionValue = getDimensionValue(token)
    const baseFont = platform?.basePxFontSize || 16
    const floatVal = parseFloat(dimensionValue)

    if (isNaN(floatVal)) {
      throw `Invalid Number: '${token.name}: ${dimensionValue}' is not a valid number, cannot transform to rem \n`
    }

    if (floatVal === 0) {
      return '0'
    }

    return `${floatVal / baseFont}rem`
  },
}
