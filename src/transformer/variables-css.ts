import StyleDictionary from 'style-dictionary';

/**
 * getCssVarPrefix
 * @description get the cssVarPrefix from the options
 */
function getCssVarPrefix(options: StyleDictionary.Options) {
  return (options && options?.cssVarPrefix) || null
}

/**
 * variablesCss
 * @description convert the `name` to a css variable
 */
export const variablesCss: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  transformer: (token: StyleDictionary.TransformedToken, options: StyleDictionary.Options) => {
    const cssVarPrefix = getCssVarPrefix(options);
    const varPrefix = cssVarPrefix ? `${cssVarPrefix}-` : ''
    return `var(--${varPrefix}${token.name})`
  },
}
