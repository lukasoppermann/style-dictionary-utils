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
  // transformer: ({ value }: { value: TokenGradient }) =>
  //   `${value.angle} ${value.color} ${value.position}`
  transformer: (token: StyleDictionary.TransformedToken) => {
    console.log('token!', token)
   return (token.value.map((string: string) => hasSpaceInName(string) ? `'${string}'` : string).join(", "))
  } 
}