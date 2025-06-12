import {Transform, TransformedToken} from 'style-dictionary/types'
import {isDuration} from '../filter/isDuration.js'
import {getDurationValueAndUnit, formatDurationString} from '../utilities/durationUtils.js'

/**
 * durationMsToS
 * @description convert duration tokens from milliseconds to seconds
 */
export const durationMsToS: Transform = {
  name: 'duration/msToS',
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken) => {
    if (!isDuration(token)) return false
    
    const {unit} = getDurationValueAndUnit(token)
    return unit === 'ms'
  },
  transform: (token: TransformedToken) => {
    const {value, unit} = getDurationValueAndUnit(token)
    
    if (unit !== 'ms') {
      throw new Error(`Invalid unit for duration/msToS: '${token.name}' has unit '${unit}', expected 'ms'`)
    }
    
    if (value === 0) {
      return '0s'
    }
    
    const seconds = value / 1000
    return formatDurationString(seconds, 's')
  },
}

/**
 * durationSToMs  
 * @description convert duration tokens from seconds to milliseconds
 */
export const durationSToMs: Transform = {
  name: 'duration/sToMs',
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken) => {
    if (!isDuration(token)) return false
    
    const {unit} = getDurationValueAndUnit(token)
    return unit === 's'
  },
  transform: (token: TransformedToken) => {
    const {value, unit} = getDurationValueAndUnit(token)
    
    if (unit !== 's') {
      throw new Error(`Invalid unit for duration/sToMs: '${token.name}' has unit '${unit}', expected 's'`)
    }
    
    if (value === 0) {
      return '0ms'
    }
    
    const milliseconds = value * 1000
    return formatDurationString(milliseconds, 'ms')
  },
}