import {Transform, TransformedToken} from 'style-dictionary/types'
import {isDuration} from '../filter/isDuration.js'
import {getDurationValueAndUnit, formatDurationString} from '../utilities/durationUtils.js'

/**
 * durationToCss
 * @description convert duration tokens to CSS-compatible format, preserving original units
 */
export const durationToCss: Transform = {
  name: 'duration/toCss',
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken) => {
    return isDuration(token)
  },
  transform: (token: TransformedToken) => {
    const {value, unit} = getDurationValueAndUnit(token)
    
    // Validate that the unit is supported
    if (unit !== 'ms' && unit !== 's') {
      throw new Error(`Invalid unit for duration/toCss: '${token.name}' has unit '${unit}', expected 'ms' or 's'`)
    }
    
    // Handle zero values - always return "0s" for consistency with CSS
    if (value === 0) {
      return '0s'
    }
    
    // Return the value with its original unit preserved
    return formatDurationString(value, unit)
  },
}