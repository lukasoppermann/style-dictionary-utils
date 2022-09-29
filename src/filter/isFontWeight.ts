import StyleDictionary from 'style-dictionary';
/**
 * @name isFontWeight
 * @type filter
 * @description only returns tokens of type `fontWeight`
 */
export const isFontWeight = (token: StyleDictionary.TransformedToken): boolean => token?.$type === 'fontWeight' || token?.type === 'fontWeight';
