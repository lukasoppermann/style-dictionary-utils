import StyleDictionary from 'style-dictionary'
import { isDimension } from '../filter/isDimension';
/**
 * dimensionPixelToRem
 * @description convert all dimensions that use pixel value to rem, uses `platform.options.basePxFontSize`
 * as the base font, or `16` if not provided
 */
export const dimensionPixelToRem: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: (token: StyleDictionary.TransformedToken) => isDimension(token) && token.value.substring(token.value.length - 2) === 'px',
  transformer: (token: StyleDictionary.TransformedToken, platform: StyleDictionary.Platform | undefined) => {
    const baseFont = platform?.basePxFontSize || 16;
    const floatVal = parseFloat(token.value)

    if (isNaN(floatVal)) {
      throw `Invalid Number: '${token.name}: ${token.value}' is not a valid number, cannot transform to rem \n`;
    }

    if (floatVal === 0) {
      return '0';
    }

    return `${floatVal / baseFont}rem`;
  }
}