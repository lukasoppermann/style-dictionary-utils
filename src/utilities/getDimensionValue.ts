import {TransformedToken} from 'style-dictionary/types'
import {getValue} from './getValue.js'

/**
 * Extract the actual dimension value from both string and structured formats
 * @param token - The token to extract the dimension value from
 * @returns The dimension value as a string
 */
export const getDimensionValue = (token: TransformedToken): string => {
  const tokenValue = getValue(token)
  
  // Handle new structured format: { value: 2, unit: "rem" }
  if (typeof tokenValue === 'object' && tokenValue !== null && 'value' in tokenValue && 'unit' in tokenValue) {
    const structuredValue = tokenValue as { value: number; unit: string }
    return `${structuredValue.value}${structuredValue.unit}`
  }
  
  // Handle old structured format: { value: '20px' }
  if (typeof tokenValue === 'object' && tokenValue !== null && 'value' in tokenValue) {
    return (tokenValue as { value: string }).value
  }
  
  // Handle simple string format: '20px'
  if (typeof tokenValue === 'string') {
    return tokenValue
  }
  
  // Fallback to string conversion
  return String(tokenValue)
}