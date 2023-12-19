import type { ValueTransform, TransformedToken } from 'style-dictionary/types'
import { isCubicBezier } from '../filter/isCubicBezier.js'

type TokenCubicBezier = [
  x1: number,
  y1: number,
  x2: number,
  y2: number
]

export const cubicBezierCss: Omit<ValueTransform, 'name'> = {
  type: `value`,
  transitive: true,
  matcher: (token: TransformedToken) => isCubicBezier(token) && Array.isArray(token.value),
  transformer: ({ value: [x1, y1, x2, y2] }: { value: TokenCubicBezier }) =>
    `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`
}