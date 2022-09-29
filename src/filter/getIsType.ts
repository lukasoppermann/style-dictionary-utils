import StyleDictionary from 'style-dictionary';
/**
 * @name getIsType
 * @type filter
 * @description only returns tokens of specified type(s)
 * @param args one more multiple type `strings` like `"color"` or `"color", "dimension"`
 * @returns filter function
 */
export const getIsType = (...args: string[]) =>
  (token: StyleDictionary.TransformedToken): boolean =>
    args.includes(token?.$type ?? token?.type);
