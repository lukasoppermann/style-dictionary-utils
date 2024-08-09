import { Transform, TransformedToken } from 'style-dictionary/types'
import { isCubicBezier } from '../filter/isCubicBezier'

type TokenCubicBezier = [
  x1: number,
  y1: number,
  x2: number,
  y2: number
]

export const cubicBezierCss: Transform = {
  name: 'cubicBezier/css',
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken) => isCubicBezier(token) && Array.isArray(token.value),
  transform: ({value}: Omit<TransformedToken, 'value'> & { value?: TokenCubicBezier}) => {
    if(!value) return
    const [x1, y1, x2, y2] = value
    return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`
  }
}