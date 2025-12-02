import {Transform, TransformedToken} from 'style-dictionary/types'
import {isDeprecated} from '../filter/isDeprecated.js'

/**
 * commentDeprecated
 * @description replaces the comment of a token with the deprecated comment
 */
export const commentDeprecated: Transform = {
  name: 'comment/deprecated',
  type: `attribute`,
  transitive: true,
  filter: isDeprecated.filter,
  transform: (token: TransformedToken) => {
    token.$description = `DEPRECATED${typeof token.$deprecated === 'string' ? `: ${token.$deprecated}` : ''}`
    return token
  },
}
