import {TransformedToken} from 'style-dictionary/types'
/**
 * @name isTransition
 * @type filter
 * @description only returns tokens of type `transition`
 */
export const isTransition = {
  name: 'isTransition',
  filter: (token: TransformedToken): boolean =>
    token?.$type === 'transition' || token?.type === 'transition',
}
