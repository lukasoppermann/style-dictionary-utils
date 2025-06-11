import {TransformedToken} from 'style-dictionary/types'
import {getValue} from './getValue.js'

/**
 * Type definition for the new duration object format
 */
export interface DurationValue {
  value: number
  unit: string
}

/**
 * Type definition for duration values (old string or new object format)
 */
export type DurationTokenValue = string | DurationValue

/**
 * Checks if a duration value is in the new object format
 */
export const isDurationValueObject = (value: DurationTokenValue): value is DurationValue => {
  return typeof value === 'object' && value !== null && 'value' in value && 'unit' in value
}

/**
 * Parses a duration string to extract value and unit
 * @param stringValue - string like "300ms" or "2s" or "0"
 * @returns object with value and unit
 */
export const parseDurationString = (stringValue: string): DurationValue => {
  // Handle unitless numbers (like "0" or "1.5")
  const unitlessMatch = stringValue.match(/^([\d.-]+)$/)
  if (unitlessMatch) {
    const value = parseFloat(unitlessMatch[1])
    if (isNaN(value)) {
      throw new Error(`Invalid numeric value in duration string: "${stringValue}"`)
    }
    return {value, unit: ''}
  }
  
  // Handle values with units
  const match = stringValue.match(/^([\d.-]+)([a-zA-Z%]+)$/)
  if (!match) {
    throw new Error(`Invalid duration string: "${stringValue}"`)
  }
  
  const value = parseFloat(match[1])
  const unit = match[2].trim()
  
  if (isNaN(value)) {
    throw new Error(`Invalid numeric value in duration string: "${stringValue}"`)
  }
  
  return {value, unit}
}

/**
 * Gets the numeric value from a duration token (supports both formats)
 * @param token - the token to extract value from
 * @returns numeric value
 */
export const getDurationValue = (token: TransformedToken): number => {
  const tokenValue = getValue<DurationTokenValue>(token)
  
  if (isDurationValueObject(tokenValue)) {
    return tokenValue.value
  }
  
  // Log deprecation warning for old string format
  logDurationDeprecationWarning(token)
  
  // Parse old string format
  const parsed = parseDurationString(tokenValue)
  return parsed.value
}

/**
 * Gets the unit from a duration token (supports both formats)
 * @param token - the token to extract unit from
 * @returns unit string
 */
export const getDurationUnit = (token: TransformedToken): string => {
  const tokenValue = getValue<DurationTokenValue>(token)
  
  if (isDurationValueObject(tokenValue)) {
    return tokenValue.unit
  }
  
  // Log deprecation warning for old string format
  logDurationDeprecationWarning(token)
  
  // Parse old string format
  const parsed = parseDurationString(tokenValue)
  return parsed.unit
}

/**
 * Gets both value and unit from a duration token (supports both formats)
 * @param token - the token to extract data from
 * @returns object with value and unit
 */
export const getDurationValueAndUnit = (token: TransformedToken): DurationValue => {
  const tokenValue = getValue<DurationTokenValue>(token)
  
  if (isDurationValueObject(tokenValue)) {
    return tokenValue
  }
  
  // Log deprecation warning for old string format
  logDurationDeprecationWarning(token)
  
  // Parse old string format
  return parseDurationString(tokenValue)
}

/**
 * Formats a duration value back to a string (for output)
 * @param value - numeric value
 * @param unit - unit string
 * @returns formatted string like "300ms"
 */
export const formatDurationString = (value: number, unit: string): string => {
  return `${value}${unit}`
}

/**
 * Logs a deprecation warning for using the old string format
 * @param token - the token using the old format
 */
export const logDurationDeprecationWarning = (token: TransformedToken): void => {
  const tokenValue = getValue<DurationTokenValue>(token)
  console.error(
    `DEPRECATED: Token "${token.name}" uses the old string format "${tokenValue}" for duration tokens. ` +
    `Please update to the new object format: {"value": number, "unit": "string"}. ` +
    `This format will be removed in a future major release.`
  )
}