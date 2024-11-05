import { TransformedToken } from "style-dictionary/types";

/**
 * getValue
 * @description Returns the value of the design token, either token.value or token.$value
 * @param token StyleDictionary.DesignToken
 * @returns token value
 */
export const getValue = <T>(
  token: TransformedToken | Record<string, unknown>
): T => {
  return token.value ?? token.$value;
};
