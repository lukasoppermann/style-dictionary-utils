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

  // transformer: ({ value }: { value: TokenGradient }) =>
  //   `${value.angle} ${value.color} ${value.position}`
  // transformer: (token: StyleDictionary.TransformedToken) => {
  //   console.log("token!", token)
  //   // token.value.map((string: any) => `${string.color} ${string.position}`))
  // return (token.value.map((string: any) => `${string.color} ${string.position}`))
  // // return (  token.value.map((string: any) => `${string.color}`).join(", "))
  // // return (  token.value.map((string: any) => hasSpaceInName(string.color) ? `'${string.color}'` : string.color).join(", "))
  //   // hasSpaceInName(string) ? `'${string}'` : string).join(", "))
  // } 

//   transformer: (token: StyleDictionary.TransformedToken) => {
//     token.value.map((string: any) => {
//     return (`${string.color || ''} ${string.position || ''}`)
//   })
// }

}