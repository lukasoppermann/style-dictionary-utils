import {TransformedToken} from 'style-dictionary/types'
/**
 * @name isDuration
 * @type filter
 * @description only returns tokens of type `duration`
 */
export const isDuration = {
  name: 'isDuration',
  filter: (token: TransformedToken): boolean =>
    token?.$type === 'duration' || token?.type === 'duration',
}
