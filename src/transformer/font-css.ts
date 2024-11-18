import {Transform, TransformedToken} from 'style-dictionary/types'
import {isTypography} from '../filter/isTypography.js'
type TokenTypography = {
  fontFamily: string
  fontSize: number
  fontWeight?: number
  lineHeight?: number
  fontStyle?: string
}
/**
 * @description convert a w3c `typography` token to a value that can be used with the css `font` property
 */
export const fontCss: Transform = {
  name: 'font/css',
  type: `value`,
  transitive: true,
  filter: isTypography,
  transform: ({value}: Omit<TransformedToken, 'value'> & {value?: TokenTypography}) => {
    if (!value) return
    // font: font-style font-variant font-weight font-size/line-height font-family;
    return `${value.fontStyle || ''} ${value.fontWeight || ''} ${value.fontSize}${value.lineHeight ? '/' + value.lineHeight : ''} ${value.fontFamily}`
      .trim()
      .replace(/\s\s+/g, ' ')
  },
}
