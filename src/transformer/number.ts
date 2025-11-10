import {Transform, TransformedToken} from 'style-dictionary/types'
import {isNumber} from '../filter/isNumber.js'
import { getValue } from '../utilities/getValue.js'

/**
 * dimensionRemToPixel
 * @description convert all dimensions that use rem value to pixels, uses `platform.options.basePxFontSize`
 * as the base font, or `16` if not provided
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
