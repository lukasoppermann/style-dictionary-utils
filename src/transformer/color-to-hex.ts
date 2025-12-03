import {toHex} from 'color2k'
import {Transform, TransformedToken} from 'style-dictionary/types'
import {isColorFilter} from '../filter/isColor.js'
import {getValue} from '../utilities/getValue.js'
/**
 * colorToHex
 * @description convert a token of type `color` to a hex value
 */
export const colorToHex: Transform = {
  name: 'color/hex',
  type: `value`,
  transitive: true,
  filter: isColorFilter,
  transform: (token: TransformedToken) => toHex(getValue<string>(token)),
}
