import {TransformedToken} from 'style-dictionary/types'
/**
 * @name isColorOrGradient
 * @type filter
 * @description only returns tokens of type `color` and `gradient`
 */
export const isColorOrGradient = (token: TransformedToken): boolean =>
  ['color', 'gradient'].includes(token?.$type ?? token?.type ?? '')
