import { Transform, TransformedToken } from 'style-dictionary/types'
import { isBorder } from '../filter/isBorder.js'

type StrokeStyleString = 'solid' |
'dashed' |
'dotted' |
'double' |
'groove' |
'ridge' |
'outset' |
'inset' 

type TokenBorder = {
  color: string,
  width: string,
  style: StrokeStyleString
}

/**
 * @description convert a w3c `border` token to a value that can be used with the css `border` property
 */
export const borderCss: Transform = {
  name: 'border/css',
  type: `value`,
  transitive: true,
  filter: isBorder,
  transform: (token: Omit<TransformedToken, 'value'> & { value?: TokenBorder}) => {
    if (!token.value) return;
    if(typeof token.value.style !== 'string') throw new Error("Only string stroke styles are supported for border tokens");
    return `${token.value.width} ${token.value.style} ${token.value.color}`
  }
}