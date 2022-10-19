import StyleDictionary from 'style-dictionary';
/**
 * @name isColorOrGradient
 * @type filter
 * @description only returns tokens of type `color` and `gradient`
 */
export const isColorOrGradient = (token: StyleDictionary.TransformedToken): boolean => ['color', 'gradient'].includes(token?.$type ?? token?.type);
