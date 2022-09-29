import StyleDictionary from 'style-dictionary';
/**
 * @name isTypographic
 * @type filter
 * @description only returns tokens of type `typography`, `fontFamily`
 */
export const isTypographic = (token: StyleDictionary.TransformedToken): boolean => ['typography', 'fontWeight', 'fontFamily'].includes(token?.$type ?? token?.type);
