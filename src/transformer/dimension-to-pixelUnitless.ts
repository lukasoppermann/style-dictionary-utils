import {isDimension} from '../filter/isDimension.js'
import {PlatformConfig, Transform, TransformedToken} from 'style-dictionary/types'
import {getDimensionDurationValueAndUnit} from '../utilities/dimensionUtils.js'

/**
 * @description base font size from options or 16
 * @param options
 * @returns number
 */
const getBasePxFontSize = (options?: PlatformConfig): number => (options?.basePxFontSize ? options.basePxFontSize : 16)

/**
 * @description converts dimension tokens value to float without unit, ignores `em` as they are relative to the font size of the parent element
 * @type value transformer — [StyleDictionary.ValueTransform](https://github.com/amzn/style-dictionary/blob/main/types/Transform.d.ts)
 * @matcher matches all tokens of $type `dimension`
 * @transformer returns a float number
 */
export const dimensionToPixelUnitless: Transform = {
  name: 'dimension/pixelUnitless',
  type: `value`,
  transitive: true,
  filter: isDimension,
  transform: (token: TransformedToken, options?: PlatformConfig) => {
    const {value, unit} = getDimensionDurationValueAndUnit(token)
    const baseFont = getBasePxFontSize(options)

    if (isNaN(value)) {
      throw new Error(
        `Invalid dimension token: '${token.name}: ${value}${unit}' is not valid and cannot be transform to 'float' \n`,
      )
    }

    if (value === 0) {
      return 0
    }

    if (unit === 'rem') {
      return value * baseFont
    }

    if (unit === 'px') {
      return value
    }
    
    // Handle unitless values (treat as already in desired units)
    if (unit === '') {
      return value
    }

    // Return the original value for other units (like em, %, etc.)
    return `${value}${unit}`
  },
}
