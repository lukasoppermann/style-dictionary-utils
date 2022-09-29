import StyleDictionary from 'style-dictionary';
/**
 * @name isDuration
 * @type filter
 * @description only returns tokens of type `duration`
 */
export const isDuration = (token: StyleDictionary.TransformedToken): boolean => token?.$type === 'duration' || token?.type === 'duration';
