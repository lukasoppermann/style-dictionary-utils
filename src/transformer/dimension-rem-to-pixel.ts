import {PlatformConfig, Transform, TransformedToken} from 'style-dictionary/types'
import {isDimension} from '../filter/isDimension.js'
import {getDimensionDurationValueAndUnit, formatDimensionDurationString} from '../utilities/dimensionUtils.js'
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
    if (!isDimension(token)) return false
    
    const {unit} = getDimensionDurationValueAndUnit(token)
    return unit === 'rem'
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

    return formatDimensionDurationString(baseFont * value, 'px')
  },
}
