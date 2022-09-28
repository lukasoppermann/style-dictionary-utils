import StyleDictionary from 'style-dictionary';
/**
 * @name isColorAndGradient
 * @type filter
 * @description only returns tokens of type `color` and `gradient`
 */
export const isColorAndGradient = (token: StyleDictionary.TransformedToken): boolean => {
  return ['color', 'gradient'].includes(token?.$type ?? token?.type);
}