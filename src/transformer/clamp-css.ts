import type { ValueTransform } from 'style-dictionary/types'
import { isClamp } from '../filter/isClamp.js'
import type { TransformedToken } from 'style-dictionary/types';

export const clampCss: ValueTransform = {
  name: "clamp/css",
  type: `value`,
  transitive: true,
  filter: isClamp,
  transform: ({ value }: TransformedToken) =>
    `clamp(${value.min}, ${value.ideal}, ${value.max})`
}