import {TransformedToken} from 'style-dictionary/types'
/**
 * @name isTypography
 * @type filter
 * @description only returns tokens of type `typography`
 */
export const isTypography = {
  name: 'isTypography',
  filter: (token: TransformedToken): boolean =>
    token?.$type === 'typography' || token?.type === 'typography',
}
