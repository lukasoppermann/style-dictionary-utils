import StyleDictionary from 'style-dictionary';
/**
 * @name isTypography
 * @type filter
 * @description only returns tokens of type `typography`
 */
export const isTypography = (token: StyleDictionary.TransformedToken): boolean => token?.$type === 'typography' || token?.type === 'typography';
