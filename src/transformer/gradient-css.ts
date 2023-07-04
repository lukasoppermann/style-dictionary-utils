import StyleDictionary from 'style-dictionary'
import { isGradient } from '../filter/isGradient'

type TokenGradient = {
  color: number
  position: string
  angle: number
}

export const gradientCss: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: isGradient,
  transformer: (token: StyleDictionary.TransformedToken) => token.value.map((string: TokenGradient) => `${string.color || ""} ${string.position || ""} ${string.angle || ""}`.trim()).join(", ")
}