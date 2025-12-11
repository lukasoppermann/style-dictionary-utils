import {Transform, TransformedToken} from 'style-dictionary/types'
import {getValue} from '../utilities/getValue.js'
import {isTypographyFilter} from '../filter/isTypography.js'
import {PlatformConfig} from 'style-dictionary'
import {TypographyTokenValue} from './typography-css.js'
import {dimensionValueTransformer} from './dimension-css.js'

/**
 * letterspacingCss
 * @description convert a typography token to a CSS-compatible transition string
 */
export const letterspacingCss: Transform = {
  name: 'letterspacing/css',
  type: `value`,
  transitive: true,
  filter: isTypographyFilter,
  transform: (token: TransformedToken, platform: PlatformConfig) => {
    const {letterSpacing} = getValue<TypographyTokenValue>(token, 'original')
    return dimensionValueTransformer(letterSpacing, platform)
  },
}
