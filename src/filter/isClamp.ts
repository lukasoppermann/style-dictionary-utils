import StyleDictionary from 'style-dictionary';
/**
 * @name isClamp
 * @type filter
 * @description only returns tokens of type `shadow`
 */
export const isClamp = (token: StyleDictionary.TransformedToken): boolean => token?.$type === 'clamp' || token?.type === 'clamp';
