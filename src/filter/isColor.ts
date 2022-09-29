import StyleDictionary from 'style-dictionary';
/**
 * @name isColor
 * @type filter
 * @description only returns tokens of type `color`
 */
export const isColor = (token: StyleDictionary.TransformedToken): boolean => token?.$type === 'color' || token?.type === 'color';
