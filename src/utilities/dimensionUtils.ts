import {TransformedToken} from 'style-dictionary/types'
import {getValue} from './getValue.js'

/**
 * Type definition for the new dimension/duration object format
 */
export interface DimensionDurationValue {
  value: number
  unit: string
}

/**
 * Type definition for dimension/duration values (old string or new object format)
 */
export type DimensionDurationTokenValue = string | DimensionDurationValue

/**
 * Checks if a dimension/duration value is in the new object format
 */
export const isDimensionDurationValueObject = (value: DimensionDurationTokenValue): value is DimensionDurationValue => {
  return typeof value === 'object' && value !== null && 'value' in value && 'unit' in value
}

/**
 * Parses a dimension/duration string to extract value and unit
 * @param stringValue - string like "2rem" or "300ms" or "0"
 * @returns object with value and unit
 */
export const parseDimensionDurationString = (stringValue: string): DimensionDurationValue => {
  // Handle unitless numbers (like "0" or "1.5")
  const unitlessMatch = stringValue.match(/^([\d.-]+)$/)
  if (unitlessMatch) {
    const value = parseFloat(unitlessMatch[1])
    if (isNaN(value)) {
      throw new Error(`Invalid numeric value in dimension/duration string: "${stringValue}"`)
    }
    return {value, unit: ''}
  }
  
  // Handle values with units
  const match = stringValue.match(/^([\d.-]+)([a-zA-Z%]+)$/)
  if (!match) {
    throw new Error(`Invalid dimension/duration string: "${stringValue}"`)
  }
  
  const value = parseFloat(match[1])
  const unit = match[2].trim()
  
  if (isNaN(value)) {
    throw new Error(`Invalid numeric value in dimension/duration string: "${stringValue}"`)
  }
  
  return {value, unit}
}

/**
 * Gets the numeric value from a dimension/duration token (supports both formats)
 * @param token - the token to extract value from
 * @returns numeric value
 */
export const getDimensionDurationValue = (token: TransformedToken): number => {
  const tokenValue = getValue<DimensionDurationTokenValue>(token)
  
  if (isDimensionDurationValueObject(tokenValue)) {
    return tokenValue.value
  }
  
  // Log deprecation warning for old string format
  logDimensionDurationDeprecationWarning(token)
  
  // Parse old string format
  const parsed = parseDimensionDurationString(tokenValue)
  return parsed.value
}

/**
 * Gets the unit from a dimension/duration token (supports both formats)
 * @param token - the token to extract unit from
 * @returns unit string
 */
export const getDimensionDurationUnit = (token: TransformedToken): string => {
  const tokenValue = getValue<DimensionDurationTokenValue>(token)
  
  if (isDimensionDurationValueObject(tokenValue)) {
    return tokenValue.unit
  }
  
  // Log deprecation warning for old string format
  logDimensionDurationDeprecationWarning(token)
  
  // Parse old string format
  const parsed = parseDimensionDurationString(tokenValue)
  return parsed.unit
}

/**
 * Gets both value and unit from a dimension/duration token (supports both formats)
 * @param token - the token to extract data from
 * @returns object with value and unit
 */
export const getDimensionDurationValueAndUnit = (token: TransformedToken): DimensionDurationValue => {
  const tokenValue = getValue<DimensionDurationTokenValue>(token)
  
  if (isDimensionDurationValueObject(tokenValue)) {
    return tokenValue
  }
  
  // Log deprecation warning for old string format
  logDimensionDurationDeprecationWarning(token)
  
  // Parse old string format
  return parseDimensionDurationString(tokenValue)
}

/**
 * Formats a dimension/duration value back to a string (for output)
 * @param value - numeric value
 * @param unit - unit string
 * @returns formatted string like "2rem"
 */
export const formatDimensionDurationString = (value: number, unit: string): string => {
  return `${value}${unit}`
}

/**
 * Logs a deprecation warning for using the old string format
 * @param token - the token using the old format
 */
export const logDimensionDurationDeprecationWarning = (token: TransformedToken): void => {
  const tokenValue = getValue<DimensionDurationTokenValue>(token)
  console.error(
    `DEPRECATED: Token "${token.name}" uses the old string format "${tokenValue}" for ${token.$type || token.type} tokens. ` +
    `Please update to the new object format: {"value": number, "unit": "string"}. ` +
    `This format will be removed in a future major release.`
  )
}