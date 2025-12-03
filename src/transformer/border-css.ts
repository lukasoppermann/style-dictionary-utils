import {Transform, TransformedToken} from 'style-dictionary/types'
import {isBorderFilter} from '../filter/isBorder.js'
import {getValue} from '../utilities/getValue.js'

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
  name: 'border/css',
  type: `value`,
  transitive: true,
  filter: isBorderFilter,
  transform: (token: Omit<TransformedToken, 'value'> & {value?: TokenBorder}) => {
    const tokenValue = getValue<Omit<TransformedToken, 'value'> & {value?: TokenBorder}>(token)
    if (!tokenValue) return
    if (typeof tokenValue.style !== 'string')
      throw new Error('Only string stroke styles are supported for border tokens')
    return `${tokenValue.width} ${tokenValue.style} ${tokenValue.color}`
  },
}
