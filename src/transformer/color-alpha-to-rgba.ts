import {toRgba} from 'color2k'
import {Transform, TransformedToken} from 'style-dictionary/types'
import {isColor} from '../filter/isColor.js'
import {alpha} from '../utilities/alpha.js'
import {getValue} from '../utilities/getValue.js'
/**
 * colorAlphaToRgba
 * @description convert a token of type `color` to a rgba value
 */
export const colorAlphaToRgba: Transform = {
  name: 'color/rgbAlpha',
  type: `value`,
  transitive: true,
  filter: isColor.filter,
  transform: (token: TransformedToken) => {
    const tokenValue = getValue<string>(token)
    if (token.alpha !== undefined) return alpha(tokenValue, token.alpha)
    return toRgba(tokenValue)
  },
}
