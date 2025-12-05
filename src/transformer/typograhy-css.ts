import {Transform, TransformedToken} from 'style-dictionary/types'
import {isTypographyFilter} from '../filter/isTypography.js'
import {getValue} from '../utilities/getValue.js'
import { DimensionTokenValue } from './dimension-css.js'
import {FontWeightNumeric, FontWeightString} from './fontWeight-css.js'
type TokenTypography = {
  fontFamily: string | string[]
  fontSize: DimensionTokenValue
  fontWeight?: FontWeightString | FontWeightNumeric
  lineHeight?: number
}
/**
 * @description convert a w3c `typography` token to a value that can be used with the css `font` property
 */
export const typographyCss: Transform = {
  name: 'typography/css',
  type: `value`,
  transitive: true,
  filter: isTypographyFilter,
  transform: (token: TransformedToken) => {
    const tokenValue = getValue<TokenTypography>(token)
    if (!tokenValue) return
    // font: font-style font-variant font-weight font-size/line-height font-family;
    return [
      tokenValue.fontWeight,
      `${tokenValue.fontSize}${tokenValue.lineHeight ? '/' + tokenValue.lineHeight : ''}`,
      tokenValue.fontFamily,
    ]
      .filter(Boolean)
      .join(' ')
  },
}
