import { TransformedToken } from "style-dictionary/types";
import { getValue } from "../utilities/getValue";
/**
 * @name isClamp
 * @type filter
 * @description only returns tokens of type `shadow`
 */
export const isClamp = (token: TransformedToken): boolean => {
  const tokenValue = getValue(token);
  return (
    (token?.$type === "clamp" || token?.type === "clamp") &&
    tokenValue !== null &&
    typeof tokenValue === "object" &&
    "min" in tokenValue &&
    "ideal" in tokenValue &&
    "max" in tokenValue
  );
};
