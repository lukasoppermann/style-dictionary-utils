import StyleDictionary from 'style-dictionary'
import { isBorder } from '../filter/isBorder'

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
export const borderCss: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: isBorder,
  transformer: ({ value }: { value: TokenBorder }) => {
    if(typeof value.style !== 'string') throw new Error("Only string stroke styles are supported for border tokens");
    return `${value.width} ${value.style} ${value.color}`
  }
}