import StyleDictionary from 'style-dictionary';
/**
 * @name isBorder
 * @type filter
 * @description only returns tokens of type `border`
 */
export const isBorder = (token: StyleDictionary.TransformedToken): boolean => token?.$type === 'border' || token?.type === 'border';
