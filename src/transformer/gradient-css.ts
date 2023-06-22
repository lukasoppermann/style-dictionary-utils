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
    `${value.angle} ${value.color1} ${value.color2}`
}