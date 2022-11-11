import StyleDictionary from 'style-dictionary'
import { isTypography } from '../filter/isTypography'
type TokenTypography = {
  fontFamily: string,
  fontSize: number,
  fontWeight?: number,
  lineHeight?: number,
  fontStyle?: string
}
/**
 * @description convert a w3c `typography` token to a value that can be used with the css `font` property
 */
export const fontCss: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: isTypography,
  transformer: ({ value }: { value: TokenTypography }) => {
    // font: font-style font-variant font-weight font-size/line-height font-family;
    return `${value.fontStyle || ''} ${value.fontWeight || ''} ${value.fontSize}${value.lineHeight ? '/' + value.lineHeight : ''} ${value.fontFamily}`.trim().replace(/\s\s+/g, ' ')
  }
}