import {PlatformConfig, Transform, TransformedToken} from 'style-dictionary/types'
import {isDimension} from '../filter/isDimension.js'
import {getDimensionDurationValueAndUnit, formatDimensionDurationString} from '../utilities/dimensionUtils.js'
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
    if (!isDimension(token)) return false
    
    const {unit} = getDimensionDurationValueAndUnit(token)
    return unit === 'px'
  },
  transform: (token: TransformedToken, platform: PlatformConfig | undefined) => {
    const {value, unit} = getDimensionDurationValueAndUnit(token)
    const baseFont = platform?.basePxFontSize || 16

    if (isNaN(value)) {
      throw `Invalid Number: '${token.name}: ${value}${unit}' is not a valid number, cannot transform to rem \n`
    }

    if (value === 0) {
      return '0'
    }

    return formatDimensionDurationString(value / baseFont, 'rem')
  },
}
