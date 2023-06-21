import StyleDictionary from 'style-dictionary'
import { isGradient } from '../filter/isGradient'

type TokenGradient = {
  color: string
  x: string
  y: string
  blur: string
  spread: string
}

export const shadowCss: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: isGradient,
  transformer: ({ value }: { value: isGradient }) =>
    `${value.x || 0} ${value.y || 0} ${value.blur || 0} ${value.spread || 0} ${value.color}`
}