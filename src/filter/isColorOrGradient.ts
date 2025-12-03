import {TransformedToken} from 'style-dictionary/types'
/**
 * @name isColorOrGradient
 * @type filter
 * @description only returns tokens of type `color` and `gradient`
 */
export const isColorOrGradientFilter = (token: TransformedToken): boolean =>
  ['color', 'gradient'].includes(token?.$type ?? token?.type ?? '')

export const isColorOrGradient = {
  name: 'isColorOrGradient',
  filter: isColorOrGradientFilter,
}
