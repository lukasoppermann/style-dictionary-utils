import {Transform, TransformedToken} from 'style-dictionary/types'
import {isDurationFilter} from '../filter/isDuration.js'
import {getDurationValueAndUnit, TokenValueDuration} from '../utilities/durationUtils.js'

export const transformDuration = (tokenValue: TokenValueDuration, name?: string): string => {
  const {value, unit} = tokenValue

  // Validate that the unit is supported
  if (unit !== 'ms' && unit !== 's') {
    throw new Error(
      `Invalid unit when transforming duration: '${name || 'unknown'}' has unit '${unit}', expected 'ms' or 's'`,
    )
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
export const durationToCss: Transform = {
  name: 'duration/css',
  type: `value`,
  transitive: true,
  filter: isDurationFilter,
  transform: (token: TransformedToken) => transformDuration(getDurationValueAndUnit(token), token.name),
}
