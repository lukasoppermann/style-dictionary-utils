import {TransformedToken} from 'style-dictionary/types'
/**
 * @name isTransition
 * @type filter
 * @description only returns tokens of type `transition`
 */
export const isTransition = (token: TransformedToken): boolean =>
  token?.$type === 'transition' || token?.type === 'transition'
