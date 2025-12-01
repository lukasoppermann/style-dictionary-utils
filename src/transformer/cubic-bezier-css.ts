import {Transform, TransformedToken} from 'style-dictionary/types'
import {isCubicBezier} from '../filter/isCubicBezier.js'
import {getValue} from '../utilities/getValue.js'

export type TokenValueCubicBezier = [x1: number, y1: number, x2: number, y2: number]

export const cubicBezierCss: Transform = {
  name: 'cubicBezier/css',
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken) => {
    const tokenValue = getValue(token)
    return isCubicBezier(token) && Array.isArray(tokenValue)
  },
  transform: (token: TransformedToken) => {
    const tokenValue = getValue<TokenValueCubicBezier[]>(token)
    const [x1, y1, x2, y2] = tokenValue
    return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`
  },
}
