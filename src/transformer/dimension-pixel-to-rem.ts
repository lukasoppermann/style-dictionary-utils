import {
  PlatformConfig,
  Transform,
  TransformedToken,
} from "style-dictionary/types";
import { isDimension } from "../filter/isDimension.js";
import { getValue } from "../utilities/getValue.js";
/**
 * dimensionPixelToRem
 * @description convert all dimensions that use pixel value to rem, uses `platform.options.basePxFontSize`
 * as the base font, or `16` if not provided
 */
export const dimensionPixelToRem: Transform = {
  name: "dimension/pixelToRem",
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken) => {
    const tokenValue = getValue<string>(token);
    return (
      isDimension(token) && tokenValue.substring(tokenValue.length - 2) === "px"
    );
  },
  transform: (
    token: TransformedToken,
    platform: PlatformConfig | undefined
  ) => {
    const baseFont = platform?.basePxFontSize || 16;
    const floatVal = parseFloat(getValue<string>(token));

    if (isNaN(floatVal)) {
      throw `Invalid Number: '${token.name}: ${getValue<string>(token)}' is not a valid number, cannot transform to rem \n`;
    }

    if (floatVal === 0) {
      return "0";
    }

    return `${floatVal / baseFont}rem`;
  },
};
