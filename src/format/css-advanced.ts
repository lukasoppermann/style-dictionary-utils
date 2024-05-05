import StyleDictionary, { TransformedToken } from 'style-dictionary'
import type { FormatterArguments } from 'style-dictionary/types/Format'
import { format } from 'prettier'
import type { LineFormatting } from 'style-dictionary/types/FormatHelpers'
const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers

export const cssAdvanced: StyleDictionary.Formatter = ({ dictionary: originalDictionary, options = {
  rules: []
}, file, platform }: FormatterArguments): string => {
  // get options
  const { outputReferences, descriptions } = options
  // selector
  const defaultSelector = file?.options?.selector !== undefined ? file?.options?.selector : ':root'
  // query extension property
  const queryExtProp = file?.options?.queryExtensionProperty || 'mediaQuery'
  // get queries from file options
  const rules = file?.options?.rules || [{
    atRule: undefined,
    selector: undefined,
    matcher: () => true
  }]
  // set formatting
  const formatting: LineFormatting = {
    commentStyle: descriptions ? 'long' : 'none',
  }
  // clone dictionary
  const dictionary = { ...originalDictionary }
  // add prefix to tokens
  if (platform.prefix) {
    dictionary.allTokens = dictionary.allTokens.map(token => ({ ...token, name: platform.prefix + '-' + token.name, path: [platform.prefix, ...token.path] } as TransformedToken))
  }
  // get queries from tokens
  for (const designToken of dictionary.allTokens) {
    const atRule = designToken.$extensions?.[queryExtProp]
    // early abort if query does not exist on token
    if (!atRule) continue
    // if query exists already from other token
    const currentQueryIndex = rules.findIndex((q: {
      atRule: string[],
      matcher: () => boolean
    }) => q.atRule === atRule)

    // if query exists
    if (currentQueryIndex > -1) {
      rules[currentQueryIndex] = {
        ...rules[currentQueryIndex],
        matcher: (token: TransformedToken) => rules[currentQueryIndex].matcher(token) || token.$extensions[queryExtProp] === rules[currentQueryIndex].atRule
      }
    }
    // if query does not exist
    else {
      rules.push({
        atRule,
        matcher: (token: TransformedToken) => token.$extensions?.[queryExtProp] === atRule
      })
    }
  }
  // add file header
  const output = [fileHeader({ file })]
  // add single theme css
  for (const { atRule, selector, matcher } of rules) {
    let preludes: string[] = !Array.isArray(atRule) ? [atRule] : atRule
    // add selectors to preludes
    preludes.push(typeof selector === 'string' || selector === false ? selector : defaultSelector)
    // remove invalid preludes
    preludes = preludes.filter(Boolean)
    // filter tokens to only include the ones that pass the matcher
    const filteredDictionary = {
      ...dictionary,
      allTokens: dictionary.allTokens.filter(matcher || (() => true))
    }
    // early abort if no matches
    if (!filteredDictionary.allTokens.length) continue
    // add tokens into root
    const css = formattedVariables({ format: 'css', dictionary: filteredDictionary, outputReferences, formatting })
    // atRule css
    let cssWithSelector = css
    for (const prelude of preludes.reverse()) {
      cssWithSelector = `${prelude} { ${cssWithSelector} }`
    }
    // add css with or without query
    output.push(cssWithSelector)
  }
  // return prettified
  return format(output.join('\n'), { parser: 'css', printWidth: 500 })
}
