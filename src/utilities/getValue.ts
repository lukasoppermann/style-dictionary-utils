import {TransformedToken} from 'style-dictionary/types'

/**
 * getValue
 * @description Returns the value of the design token, either token.value or token.$value
 * @param token StyleDictionary.DesignToken
 * @returns token value
 */
export const getValue = <T>(token: TransformedToken | Record<string, unknown>): T => {
  const value = token.$value

  if (token === undefined) {
    throw new Error(`The token is undefined.`)
  }

  if (value === undefined || value === null) {
    throw new Error(`The token ${token.name} has no valid $value property.`)
  }

  return value as T
}
