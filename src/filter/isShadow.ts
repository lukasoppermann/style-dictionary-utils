import StyleDictionary from 'style-dictionary';
/**
 * @name isShadow
 * @type filter
 * @description only returns tokens of type `shadow`
 */
export const isShadow = (token: StyleDictionary.TransformedToken): boolean => {
  return token?.$type === 'shadow' || token?.type === 'shadow';
}