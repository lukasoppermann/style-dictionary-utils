import {Transform, TransformedToken} from 'style-dictionary/types'
import {isGradient} from '../filter/isGradient.js'
import {getValue} from '../utilities/getValue.js'

type TokenGradient = {
  color: number
  position: number
}

export const deprecatedGradientCss: Transform = {
  name: 'deprecatedGradient/css',
  type: `value`,
  transitive: true,
  filter: isGradient,
  transform: (token: TransformedToken) => {
    const tokenValue = getValue<TokenGradient[]>(token)
    // combine stops to string
    const stops = tokenValue
      .map((stop: TokenGradient) => `${stop.color}${stop.position ? ` ${Math.floor(stop.position * 100)}%` : ''}`)
      .join(', ')
    // return gradient value
    return `${token.angle ? `${token.angle}, ` : ''}${stops}`
  },
}
