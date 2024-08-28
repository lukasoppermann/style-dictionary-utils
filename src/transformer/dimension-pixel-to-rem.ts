import { PlatformConfig, Transform, TransformedToken } from 'style-dictionary/types'
import { isDimension } from '../filter/isDimension.js';
/**
 * dimensionPixelToRem
 * @description convert all dimensions that use pixel value to rem, uses `platform.options.basePxFontSize`
 * as the base font, or `16` if not provided
 */
export const dimensionPixelToRem: Transform = {
  name: 'dimension/pixelToRem',
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken) => isDimension(token) && token.value.substring(token.value.length - 2) === 'px',
  transform: (token: TransformedToken, platform: PlatformConfig | undefined) => {
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