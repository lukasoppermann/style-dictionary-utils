import {Transform, TransformedToken} from 'style-dictionary/types'
import {isDurationFilter} from '../filter/isDuration.js'
import {getValue} from '../utilities/getValue.js'

export interface DurationTokenValue {
  value: number
  unit: 'ms' | 's'
}

export const durationValueTransformer = (tokenValue: DurationTokenValue): string => {
  if (typeof tokenValue === 'string') {
    return tokenValue
  }

  const {value, unit} = tokenValue

  // Validate that the unit is supported
  if (unit !== 'ms' && unit !== 's') {
    throw new Error(`Invalid unit: '${unit}', expected 'ms' or 's'`)
  }

  // Handle zero values - always return "0s" for consistency with CSS
  if (value === 0) {
    return '0s'
  }

  // Return the value with its original unit preserved
  return `${value}${unit}`
}

/**
 * durationToCss
 * @description convert duration tokens to CSS-compatible format, preserving original units
 */
export const durationCss: Transform = {
  name: 'duration/css',
  type: `value`,
  transitive: true,
  filter: isDurationFilter,
  transform: (token: TransformedToken) => {
    try {
      const durationTokenValue = getValue<DurationTokenValue>(token)
      return durationValueTransformer(durationTokenValue)
      // catch errors and rethrow with token name
    } catch (error) {
      throw new Error(`Error transforming duration token '${token.name}': ${error}`)
    }
  },
}
