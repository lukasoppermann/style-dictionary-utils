import StyleDictionary from 'style-dictionary'
import { isClamp } from '../filter/isClamp'

type TokenGradient = {
  color: number
  position: number
}

export const gradientCss: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: isClamp,
  transformer: (token: StyleDictionary.TransformedToken) => {
    // combine stops to string
    const stops = token.value.map((stop: TokenGradient) => `${stop.color}${stop.position ? ` ${Math.floor(stop.position * 100)}%` : ""}`).join(", ")
    // return gradient value
    return `${token.angle ? `${token.angle}, ` : ""}${stops}`
  }

}