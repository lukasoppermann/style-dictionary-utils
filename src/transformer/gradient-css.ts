import StyleDictionary from 'style-dictionary'
import { isGradient } from '../filter/isGradient'

type TokenGradient = {
  color: number
  position: string
  angle: number
}

const hasSpaceInName = (string: string) => /\s/g.test(string)



export const gradientCss: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: isGradient,
  transformer: (token: StyleDictionary.TransformedToken) => token.value.map((string: any) => `${string.color || ""} ${string.position || ""} ${string.angle || ""}`.trim())
}