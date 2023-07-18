import StyleDictionary from 'style-dictionary'
import { isGradient } from '../filter/isGradient'

type TokenClamp = {
  min: string
  ideal: string
  max: string
}

export const clampCss: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
//   matcher: isGradient,
  transformer: ({ value }: { value: TokenClamp }) =>
    `${value.min} ${value.ideal} ${value.max}`

//      transformer: (token: StyleDictionary.TransformedToken) => {
//     // combine stops to string
//     const stops = token.value.map((stop: TokenGradient) => `${stop.color}${stop.position ? ` ${Math.floor(stop.position * 100)}%` : ""}`).join(", ")
//     // return gradient value
//     return `${token.angle ? `${token.angle}, ` : ""}${stops}`
//   }

}