import type { ValueTransform, TransformedToken } from 'style-dictionary/types'
import { isCubicBezier } from '../filter/isCubicBezier.js'

export const cubicBezierCss: ValueTransform = {
  name: 'cubicBezier/css',
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken) => isCubicBezier(token, {}) && Array.isArray(token.value),
  transform: ({ value: [x1, y1, x2, y2] }: TransformedToken) =>
    `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`
}