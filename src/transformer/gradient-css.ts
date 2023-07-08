import StyleDictionary from 'style-dictionary'
import { isGradient } from '../filter/isGradient'

type TokenGradient = {
  color: number
  position: number
  angle: string
}

export const gradientCss: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: isGradient,
  transformer: (token: StyleDictionary.TransformedToken) => 
`${token.angle || ""}${token.angle ? "," : ""} ${token.value.map((stop: TokenGradient)  => 
  `${stop.color} ${Math.floor(stop.position * 100) || ""}${stop.position ? "%" : ""}`.trim()).join(", ")}`.trim()
}