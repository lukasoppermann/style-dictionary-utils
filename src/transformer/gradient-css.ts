import {Transform, TransformedToken} from 'style-dictionary/types'
import {isGradient} from '../filter/isGradient.js'
import {getValue} from '../utilities/getValue.js'
import {transformColor} from '../utilities/transformColor.js'
import {ColorTokenValue} from './color-to-css.js'

type TokenGradient = {
  color: ColorTokenValue
  position: number
}

export const gradientCss: Transform = {
  name: 'gradient/css',
  type: `value`,
  transitive: true,
  filter: isGradient.filter,
  transform: (token: TransformedToken) => {
    const tokenValue = getValue<TokenGradient[]>(token)
    // combine stops to string
    const stops = tokenValue
      .map(
        (stop: TokenGradient) =>
          `${transformColor(stop.color)}${stop.position ? ` ${Math.floor(stop.position * 100)}%` : ''}`,
      )
      .join(', ')
    // return gradient value
    return `${token.angle ? `${token.angle}, ` : ''}${stops}`
  },
}
