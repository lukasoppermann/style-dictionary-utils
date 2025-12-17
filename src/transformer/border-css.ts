import {Transform, TransformedToken} from 'style-dictionary/types'
import {isBorderFilter} from '../filter/isBorder.js'
import {getValue} from '../utilities/getValue.js'
import {dimensionValueTransformer} from './dimension-css.js'
import {PlatformConfig} from 'style-dictionary'
import {colorValueTransformer} from './color-css.js'

type StrokeStyleString = 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'outset' | 'inset'

type TokenBorder = {
  color: string
  width: string
  style: StrokeStyleString
}

/**
 * @description convert a w3c `border` token to a value that can be used with the css `border` property
 */
export const borderCss: Transform = {
  name: 'w3c-border/css',
  type: `value`,
  transitive: true,
  filter: isBorderFilter,
  transform: (token: Omit<TransformedToken, 'value'> & {value?: TokenBorder}, platform: PlatformConfig | undefined) => {
    // get the token value
    const tokenValue = getValue<Omit<TransformedToken, 'value'> & {value?: TokenBorder}>(token)
    // check for valid style proeprty
    if (typeof tokenValue.style !== 'string')
      throw new Error('Only string stroke styles are supported for border tokens')
    // return token as css border value
    return `${dimensionValueTransformer(tokenValue.width, platform)} ${tokenValue.style} ${colorValueTransformer(tokenValue.color, platform)}`
  },
}
