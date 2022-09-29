import StyleDictionary from 'style-dictionary';
/**
 * @name isCubicBezier
 * @type filter
 * @description only returns tokens of type `cubicBezier`
 */
export const isCubicBezier = (token: StyleDictionary.TransformedToken): boolean => token?.$type === 'cubicBezier' || token?.type === 'cubicBezier';
