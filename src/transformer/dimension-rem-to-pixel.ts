import type { ValueTransform, TransformedToken, PlatformConfig } from 'style-dictionary/types'
import { isDimension } from '../filter/isDimension.js';
/**
 * dimensionRemToPixel
 * @description convert all dimensions that use rem value to pixels, uses `platform.options.basePxFontSize`
 * as the base font, or `16` if not provided
 */
export const dimensionRemToPixel: Omit<ValueTransform, 'name'> = {
  type: `value`,
  transitive: true,
  matcher: (token: TransformedToken) => isDimension(token) && token.value.substring(token.value.length - 3) === 'rem',
  transformer: (token: TransformedToken, platform: PlatformConfig | undefined) => {
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