import type { ValueTransform } from 'style-dictionary/types'
import { isClamp } from '../filter/isClamp.js'
import type { TransformedToken } from 'style-dictionary/types';

export const clampCss: Omit<ValueTransform, 'name'> = {
  type: `value`,
  transitive: true,
  matcher: isClamp,
  transformer: ({ value }: TransformedToken) =>
    `clamp(${value.min}, ${value.ideal}, ${value.max})`
}