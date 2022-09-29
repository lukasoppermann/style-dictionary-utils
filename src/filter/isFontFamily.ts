import StyleDictionary from 'style-dictionary';
/**
 * @name isFontFamily
 * @type filter
 * @description only returns tokens of type `fontFamily`
 */
export const isFontFamily = (token: StyleDictionary.TransformedToken): boolean => token?.$type === 'fontFamily' || token?.type === 'fontFamily';
