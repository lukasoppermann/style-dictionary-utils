import {Transform, TransformedToken} from 'style-dictionary/types'
import {getValue} from '../utilities/getValue.js'
import {isTypography} from '../filter/isTypography.js'
import {PlatformConfig} from 'style-dictionary'
import {TokenValueTypography} from './typography-to-css.js'
import {transformDimensionValue} from './dimension.js'

/**
 * letterspacingCss
 * @description convert a typography token to a CSS-compatible transition string
 */
export const letterspacingCss: Transform = {
  name: 'letterspacing/css',
  type: `value`,
  transitive: true,
  filter: isTypography,
  transform: (token: TransformedToken, platform: PlatformConfig) => {
    const {letterSpacing} = getValue<TokenValueTypography>(token)

    return transformDimensionValue(letterSpacing, platform).trim()
  },
}
