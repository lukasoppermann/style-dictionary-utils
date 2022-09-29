import StyleDictionary from 'style-dictionary';
/**
 * @name isTransition
 * @type filter
 * @description only returns tokens of type `transition`
 */
export const isTransition = (token: StyleDictionary.TransformedToken): boolean => token?.$type === 'transition' || token?.type === 'transition';
