import {Transform, TransformedToken} from 'style-dictionary/types'
import {getValue} from '../utilities/getValue.js'
import { isTypography } from '../filter/isTypography.js'
import { DimensionTokenValue, transformDimensionValue } from './dimension.js'
import { TokenValueNumericFontWeight, TokenValueStringFontWeight } from './font-weight-to-number.js'
import { PlatformConfig } from 'style-dictionary'

type TokenValueTypography = {
  fontFamily: string,
  fontSize: DimensionTokenValue,
  fontWeight: TokenValueStringFontWeight | TokenValueNumericFontWeight,
  letterSpacing: DimensionTokenValue,
  lineHeight: number
}

/**
 * typographyCss
 * @description convert a typography token to a CSS-compatible transition string
 */
export const typographyCss: Transform = {
  name: 'typography/css',
  type: `value`,
  transitive: true,
  filter: isTypography,
  transform: (token: TransformedToken, platform: PlatformConfig) => {
    const {fontFamily, fontSize, fontWeight, lineHeight} = getValue<TokenValueTypography>(token)

    return `${fontWeight} ${transformDimensionValue(fontSize, platform)}/${lineHeight} ${fontFamily}`.trim()
  },
}
