import StyleDictionary from 'style-dictionary'
import { isClamp } from '../filter/isClamp'

type TokenClamp = {
  min: string
  ideal: string
  max: string
}

export const clampCss: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: isClamp,
  transformer: ({ value }: { value: TokenClamp }) =>
    `clamp(${value.min}, ${value.ideal}, ${value.max})`
}