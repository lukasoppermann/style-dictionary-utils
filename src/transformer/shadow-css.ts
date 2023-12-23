import type { ValueTransform } from 'style-dictionary/types'
import { isShadow } from '../filter/isShadow.js'

type TokenShadow = {
  color: string
  offsetX: string
  offsetY: string
  blur: string
  spread: string
}

export const shadowCss: Omit<ValueTransform, 'name'> = {
  type: `value`,
  transitive: true,
  matcher: isShadow,
  transformer: ({ value }: { value: TokenShadow }) =>
    `${value.offsetX || 0} ${value.offsetY || 0} ${value.blur || 0} ${value.spread || 0} ${value.color}`
}