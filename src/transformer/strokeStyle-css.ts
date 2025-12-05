import {Transform, TransformedToken} from 'style-dictionary/types'
import {isStrokeStyleFilter} from '../filter/isStrokeStyle.js'
import {getValue} from '../utilities/getValue.js'

const StrokeStyleValues = ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'outset', 'inset'] as const

export type TokenValueStrokeStyle = (typeof StrokeStyleValues)[number]

const transformStrokeStyleValue = (tokenValue: TokenValueStrokeStyle): string => {
  if (StrokeStyleValues.includes(tokenValue)) return tokenValue
  // invalid stroke style value
  throw new Error(
    `Invalid value for strokeStyle${tokenValue ? `: ${tokenValue}` : ''}. Only the following values are supported: ${StrokeStyleValues.join(', ')}.`,
  )
}

/**
 * fontFamilyCss
 * @description if fontFamily is an array, join it with commas and wrap font names with spaces in quotes
 */
export const strokeStyleCss: Transform = {
  name: 'strokeStyle/css',
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken) => isStrokeStyleFilter(token),
  transform: (token: TransformedToken) => {
    const tokenValue = getValue<TokenValueStrokeStyle>(token)
    return transformStrokeStyleValue(tokenValue)
  },
}
