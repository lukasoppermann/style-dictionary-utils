import StyleDictionary from 'style-dictionary';
/**
 * @name getHasAttributeValue
 * @type filter
 * @description only returns tokens of that have any of the specified attributes
 * @param attributes string or array of strings
 * @param values one more multiple values
 * @returns filter function
 */
export const getHasAttributeValue = (attributes: string | string[], values: any | any[]) => (token: StyleDictionary.TransformedToken): boolean => {
  // turn inputs into arrays
  if(!Array.isArray(attributes)) attributes = [attributes]
  if(!Array.isArray(values)) values = [values]
  // prep values (object to strings)
  values = values.map((value: any) => {
    if (typeof value === 'object') {
      return JSON.stringify(value, null, "")
    }
    return value
  })
  //
  for (const attr of attributes) {
    // earlt return
    if (!Object.prototype.hasOwnProperty.call(token, attr)) continue
    // prep value (object to strings)
    let tokenValue = token[attr]
    if (tokenValue && typeof tokenValue === 'object') {
      tokenValue = JSON.stringify(tokenValue, null, "")
    }
    // check token
    if (values.includes(tokenValue)) {
      return true
    }
  }
  return false
}