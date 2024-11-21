import {toRgba} from 'color2k'
import {Transform, TransformedToken} from 'style-dictionary/types'
import {isColor} from '../filter/isColor.js'
import {getValue} from '../utilities/getValue.js'
/**
 * colorToRgba
 * @description convert a token of type `color` to a rgba value
 */
export const colorToRgba: Transform = {
  name: 'color/rgba',
  type: `value`,
  transitive: true,
  filter: isColor,
  transform: (token: TransformedToken) => toRgba(getValue<string>(token)),
}
