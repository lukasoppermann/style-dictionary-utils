import {TransformedToken} from 'style-dictionary/types'
import {getValue} from '../utilities/getValue.js'
/**
 * @name isClamp
 * @type filter
 * @description only returns tokens of type `shadow`
 */
export const isClampFilter = (token: TransformedToken): boolean => {
  const tokenValue = getValue(token)
  return (
    (token?.$type === 'clamp' || token?.type === 'clamp') &&
    tokenValue !== null &&
    typeof tokenValue === 'object' &&
    'min' in tokenValue &&
    'ideal' in tokenValue &&
    'max' in tokenValue
  )
}

export const isClamp = {
  name: 'isClamp',
  filter: isClampFilter,
}
