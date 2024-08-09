import { PlatformConfig, Transform, TransformedToken } from 'style-dictionary/types'
import { isDimension } from '../filter/isDimension';
/**
 * dimensionRemToPixel
 * @description convert all dimensions that use rem value to pixels, uses `platform.options.basePxFontSize`
 * as the base font, or `16` if not provided
 */
export const dimensionRemToPixel: Transform = {
  name: 'dimension/remToPixel',
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken) => isDimension(token) && token.value.substring(token.value.length - 3) === 'rem',
  transform: (token: TransformedToken, platform: PlatformConfig | undefined) => {
    const baseFont = platform?.basePxFontSize || 16;
    const floatVal = parseFloat(token.value)

    if (isNaN(floatVal)) {
      throw `Invalid Number: '${token.name}: ${token.value}' is not a valid number, cannot transform to rem \n`;
    }

    if (floatVal === 0) {
      return '0';
    }

    return `${baseFont * floatVal}px`;
  }
}