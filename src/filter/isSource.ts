import StyleDictionary from 'style-dictionary';
/**
 * @name isSource
 * @type filter
 * @description only returns tokens that are coming from a `source` file and
 * not from an `included` file
 */
export const isSource = (token: StyleDictionary.TransformedToken): boolean =>
  token?.isSource === true;
