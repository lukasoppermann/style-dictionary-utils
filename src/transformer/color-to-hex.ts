import { toHex } from "color2k";
import { Transform, TransformedToken } from "style-dictionary/types";
import { isColor } from "../filter/isColor.js";
import { getValue } from "../utilities/getValue.js";
/**
 * colorToHex
 * @description convert a token of type `color` to a hex value
 */
export const colorToHex: Transform = {
  name: "color/hex",
  type: `value`,
  transitive: true,
  filter: isColor,
  transform: (token: TransformedToken) => toHex(getValue<string>(token)),
};
