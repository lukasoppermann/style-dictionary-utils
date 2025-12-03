import {TransformedToken} from 'style-dictionary/types'
/**
 * @name isCubicBezier
 * @type filter
 * @description only returns tokens of type `cubicBezier`
 */
export const isCubicBezierFilter = (token: TransformedToken): boolean =>
  token?.$type === 'cubicBezier' || token?.type === 'cubicBezier'

export const isCubicBezier = {
  name: 'isCubicBezier',
  filter: isCubicBezierFilter,
}
