import StyleDictionary from 'style-dictionary';
/**
 * @name isGradient
 * @type filter
 * @description only returns tokens of type `gradient`
 */
export const isGradient = (token: StyleDictionary.TransformedToken): boolean => token?.$type === 'gradient' || token?.type === 'gradient';
