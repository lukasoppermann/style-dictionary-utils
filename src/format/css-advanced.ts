import type { FormatFn, FormatFnArguments, FormattingOptions, TransformedToken } from 'style-dictionary/types'
import { fileHeader, formattedVariables } from 'style-dictionary/utils'
import { format } from 'prettier'

export const cssAdvanced: FormatFn = async ({ dictionary: originalDictionary, options = {
  rules: []
}, file }: FormatFnArguments) => {
  // get options
  const { outputReferences, formatting, usesDtcg } = options
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
  const mergedFormatting: FormattingOptions = {
    commentStyle: 'long',
    ...formatting
  }
  // clone dictioxnary
  const dictionary = { ...originalDictionary }
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
  const output = [await fileHeader({ file })]
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
    const css = formattedVariables({ format: 'css', dictionary: filteredDictionary, outputReferences, formatting: mergedFormatting, usesDtcg })
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

