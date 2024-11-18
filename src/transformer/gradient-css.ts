import {Transform, TransformedToken} from 'style-dictionary/types'
import {isGradient} from '../filter/isGradient.js'

type TokenGradient = {
  color: number
  position: number
}

export const gradientCss: Transform = {
  name: 'gradient/css',
  type: `value`,
  transitive: true,
  filter: isGradient,
  transform: (token: TransformedToken) => {
    // combine stops to string
    const stops = token.value
      .map((stop: TokenGradient) => `${stop.color}${stop.position ? ` ${Math.floor(stop.position * 100)}%` : ''}`)
      .join(', ')
    // return gradient value
    return `${token.angle ? `${token.angle}, ` : ''}${stops}`
  },
}
