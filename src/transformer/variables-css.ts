import StyleDictionary from "style-dictionary";

interface CssOptions {
  cssVarPrefix: string | null;
  withValueFallback: boolean | null;
}

/**
 * getCssOptions
 * @description get the css options from the options object
 */
function getCssOptions(options: StyleDictionary.Options): CssOptions {
  return {
    cssVarPrefix: options?.cssVarPrefix || null,
    withValueFallback: options?.withValueFallback || null,
  };
}

/**
 * formatCssVariable
 * @description format the css variable with prefix and fallback
 */
function formatCssVariable(name: string, value: string, options: CssOptions) {
  const varPrefix = options.cssVarPrefix ? `${options.cssVarPrefix}-` : "";
  const fallback = options.withValueFallback ? `, ${value}` : "";
  return `var(--${varPrefix}${name}${fallback})`;
}

/**
 * variablesCss
 * @description convert the `name` to a css variable
 */
export const variablesCss: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  transformer: (
    token: StyleDictionary.TransformedToken,
    options: StyleDictionary.Options
  ) => {
    const { cssVarPrefix, withValueFallback } = getCssOptions(options);
    return formatCssVariable(token.name, token.value, {
      cssVarPrefix,
      withValueFallback,
    });
  },
};
