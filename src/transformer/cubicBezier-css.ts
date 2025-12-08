import {Transform, TransformedToken} from 'style-dictionary/types'
import {isCubicBezierFilter} from '../filter/isCubicBezier.js'
import {getValue} from '../utilities/getValue.js'

export type CubicBezierTokenValue = [x1: number, y1: number, x2: number, y2: number]

export const cubicBezierTransformer = (tokenValue: CubicBezierTokenValue | string) => {
  if (typeof tokenValue === 'string') {
    return tokenValue
  }
  const [x1, y1, x2, y2] = tokenValue
  return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`
}

export const cubicBezierCss: Transform = {
  name: 'cubicBezier/css',
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken) => {
    const tokenValue = getValue(token)
    return isCubicBezierFilter(token) && Array.isArray(tokenValue)
  },
  transform: (token: TransformedToken) => {
    try {
      const tokenValue = getValue<CubicBezierTokenValue>(token)
      return cubicBezierTransformer(tokenValue)
    }
    catch (error) {
      throw new Error(`Error transforming cubicBezier token '${token.name}': ${error}`)
    }
  },
}
