import {Transform, TransformedToken} from 'style-dictionary/types'
import {isTypographyFilter} from '../filter/isTypography.js'
import {getValue} from '../utilities/getValue.js'
import {DimensionTokenValue, dimensionValueTransformer} from './dimension-css.js'
import {FontWeightNumeric, FontWeightString, fontWeightValueTransformer} from './fontWeight-css.js'
import {PlatformConfig} from 'style-dictionary'
import {fontFamilyValueTransformer} from './fontFamily-css.js'
type TokenTypography = {
  fontFamily: string | string[]
  fontSize: DimensionTokenValue
  fontWeight: FontWeightString | FontWeightNumeric
  lineHeight: number
}
/**
 * @description convert a w3c `typography` token to a value that can be used with the css `font` property
 */
export const typographyCss: Transform = {
  name: 'typography/css',
  type: `value`,
  transitive: true,
  filter: isTypographyFilter,
  transform: (token: TransformedToken, platform: PlatformConfig) => {
    const {fontWeight, fontSize, lineHeight, fontFamily}: TokenTypography = getValue<TokenTypography>(token)

    return `${fontWeightValueTransformer(fontWeight)} ${dimensionValueTransformer(fontSize, platform)}${lineHeight ? '/' + lineHeight : ''} ${fontFamilyValueTransformer(fontFamily)}`
  },
}
