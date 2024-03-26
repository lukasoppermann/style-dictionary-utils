import StyleDictionary from 'style-dictionary'
import { TransformedToken } from 'style-dictionary/types'
import type { Format } from 'style-dictionary/types'
import { format } from 'prettier'
import type { FormattingOptions } from 'style-dictionary/types/File'
const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers

export const cssAdvanced: Format['formatter'] = async ({ dictionary: originalDictionary, options = {
  queries: []
}, file, platform }: FormatterArguments) => {
  const { outputReferences, descriptions } = options
  const queries = file?.options?.queries || [{
    query: undefined,
    matcher: () => true
  }]
  const formatting: FormattingOptions = {
    commentStyle: descriptions ? 'long' : 'none',
  }
  const dictionary: FormatterArguments = { ...originalDictionary }
  // add prefix to tokens
  if (platform.prefix) {
    dictionary.allTokens = dictionary.allTokens.map((token) => ({ ...token, name: platform.prefix + '-' + token.name, path: [platform.prefix, ...token.path] } as TransformedToken))
  }
  // add file header
  const output = [await fileHeader({ file })]
  // add single theme css
  for (const query of queries) {
    const { query: queryString, matcher } = query
    // filter tokens to only include the ones that pass the matcher
    const filteredDictionary = {
      ...dictionary,
      allTokens: dictionary.allTokens.filter(matcher || (() => true))
    }
    // early abort if no matches
    if (!filteredDictionary.allTokens.length) continue
    // add tokens into root
    const rootCss = `:root {
  ${formattedVariables({ format: 'css', dictionary: filteredDictionary, outputReferences, formatting })}
}`
    // add css with or without query
    output.push(queryString ? `${queryString} { ${rootCss} }` : rootCss)
  }
  // return prettified
  return format(output.join('\n'), { parser: 'css', printWidth: 500 })
}
