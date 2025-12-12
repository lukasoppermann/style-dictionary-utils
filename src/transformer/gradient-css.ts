import {Transform, TransformedToken} from 'style-dictionary/types'
import {isGradientFilter} from '../filter/isGradient.js'
import {getValue} from '../utilities/getValue.js'
import {ColorTokenValue, colorValueTransformer} from './color-css.js'
import {PlatformConfig} from 'style-dictionary'

type TokenGradient = {
  color: ColorTokenValue
  position: number
}

export const gradientCss: Transform = {
  name: 'gradient/css',
  type: `value`,
  transitive: true,
  filter: isGradientFilter,
  transform: (token: TransformedToken, platform: PlatformConfig | undefined) => {
    const tokenValue = getValue<TokenGradient[]>(token)
    // combine stops to string
    const stops = tokenValue
      .map(
        (stop: TokenGradient) =>
          `${colorValueTransformer(stop.color, platform)}${stop.position ? ` ${Math.floor(stop.position * 100)}%` : ''}`,
      )
      .join(', ')
    // return gradient value
    return `${token.angle ? `${token.angle}, ` : ''}${stops}`
  },
}
