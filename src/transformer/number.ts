import {Transform, TransformedToken} from 'style-dictionary/types'
import {isNumber} from '../filter/isNumber.js'
import { getValue } from '../utilities/getValue.js'

/**
 * number
 * @description convert a number token to a simple number value, using the provided value as-is
 */
export const number: Transform = {
  name: 'number',
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken) => {
    return isNumber(token)
  },
  transform: (token: TransformedToken) => {
    const numberValue = getValue(token)

    if (!Number.isFinite(numberValue)) {
      throw `Invalid Number: '${token.name}: ${numberValue}' is not a valid number \n`
    }

    return numberValue
  },
}
