import {PlatformConfig, Transform, TransformedToken} from 'style-dictionary/types'
import {isDimensionFilter} from '../filter/isDimension.js'
import {getValue} from '../utilities/getValue.js'

export type DimensionTokenValue = {
  value: number
  unit: string
}

export const transformDimensionValue = (
  dimensionTokenValue: DimensionTokenValue,
  platform: PlatformConfig | undefined,
): string => {
  const {value, unit} = dimensionTokenValue
  const appendUnit = platform?.appendUnit === false ? false : true
  const outputUnit = platform?.outputUnit || unit || 'px'
  const supportedUnits = ['px', 'rem']

  if (isNaN(value)) {
    throw `Invalid Number: '${value}' is not a valid number\n`
  }

  if (!supportedUnits.includes(unit)) {
    throw `Invalid Unit: '${unit}' is not a valid unit\n`
  }

  if (value === 0) {
    return '0'
  }

  if (unit !== outputUnit) {
    if (unit === 'px' && outputUnit === 'rem') {
      const baseFont = platform?.basePxFontSize || 16
      return `${value / baseFont}${appendUnit ? outputUnit : ''}`
    }

    if (unit === 'rem' && outputUnit === 'px') {
      const baseFont = platform?.basePxFontSize || 16
      return `${baseFont * value}${appendUnit ? outputUnit : ''}`
    }
  }

  return `${value}${appendUnit ? outputUnit : ''}`
}

/**
 * dimension
 * @description convert all dimensions that use pixel value to rem, uses `platform.options.basePxFontSize`
 * as the base font, or `16` if not provided
 */
export const dimensionCss: Transform = {
  name: 'dimension',
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken) => isDimensionFilter(token),
  transform: (token: TransformedToken, platform: PlatformConfig | undefined) => {
    const dimensionTokenvalue = getValue<DimensionTokenValue>(token)

    return transformDimensionValue(dimensionTokenvalue, platform)
  },
}
