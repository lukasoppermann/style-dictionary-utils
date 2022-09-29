import StyleDictionary from 'style-dictionary';
/**
 * @name isDimension
 * @type filter
 * @description only returns tokens of type `dimension`
 */
export const isDimension = (token: StyleDictionary.TransformedToken): boolean => token?.$type === 'dimension' || token?.type === 'dimension';
