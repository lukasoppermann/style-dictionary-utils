import type { ValueTransform } from 'style-dictionary/types'
import { isClamp } from '../filter/isClamp.js'

type TokenClamp = {
  min: string
  ideal: string
  max: string
}

export const clampCss: Omit<ValueTransform, 'name'> = {
  type: `value`,
  transitive: true,
  matcher: isClamp,
  transformer: ({ value }: { value: TokenClamp }) =>
    `clamp(${value.min}, ${value.ideal}, ${value.max})`
}