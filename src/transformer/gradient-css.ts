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
  transformer: ({ value }: { value: TokenGradient }) =>
    `${value.angle} ${value.color} ${value.position}`
  // transformer: (token: StyleDictionary.TransformedToken) => token.value.map((string: string) => hasSpaceInName(string) ? `'${string}'` : string).join(", ")

}