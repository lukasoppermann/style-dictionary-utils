import StyleDictionary from 'style-dictionary'
import { isGradient } from '../filter/isGradient'

type TokenGradient = {
  color1: string
  color2: string
  angle: string
}

export const gradientCss: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: isGradient,
  transformer: ({ value }: { value: TokenGradient }) =>
    `${value.x || 0} ${value.y || 0} ${value.blur || 0} ${value.spread || 0} ${value.color}`
}