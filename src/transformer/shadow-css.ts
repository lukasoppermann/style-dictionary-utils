import StyleDictionary from 'style-dictionary'
import { isShadow } from '../filter/isShadow'

type TokenShadow = {
  color: string
  offsetX: string
  offsetY: string
  blur: string
  spread: string
}



export const shadowCss: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: isShadow,
  transformer: ({ value }: { value: string | TokenShadow }) =>
  typeof value === 'string'
    ? value
    : `${value.offsetX || 0} ${value.offsetY || 0} ${value.blur || 0} ${value.spread || 0} ${value.color}`,
}
