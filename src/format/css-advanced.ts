import StyleDictionary, { TransformedToken } from 'style-dictionary'
import type { FormatterArguments } from 'style-dictionary/types/Format'
import { format } from 'prettier'
import type { LineFormatting } from 'style-dictionary/types/FormatHelpers'
const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers

export const cssAdvanced: StyleDictionary.Formatter = ({ dictionary: originalDictionary, options = {
  queries: []
}, file, platform }: FormatterArguments) => {
  const { outputReferences, descriptions } = options
  const queries = file?.options?.queries || [{
    query: undefined,
    matcher: () => true
  }]
  const formatting: LineFormatting = {
    commentStyle: descriptions ? 'long' : 'none',
  }
  const dictionary = { ...originalDictionary }
  // add prefix to tokens
  if (platform.prefix) {
    dictionary.allTokens = dictionary.allTokens.map(token => ({ ...token, name: platform.prefix + '-' + token.name, path: [platform.prefix, ...token.path] } as TransformedToken))
  }
  // add file header
  const output = [fileHeader({ file })]
  // add single theme css
  for (const query of queries) {
    const { query: queryString, matcher } = query
    const filteredDictionary = {
      ...dictionary,
      allTokens: dictionary.allTokens.filter(matcher || (() => true))
    }
    const rootCss = `:root {
  ${formattedVariables({ format: 'css', dictionary: filteredDictionary, outputReferences, formatting })}
}`
    // add css with or without query
    output.push(queryString ? `${queryString} { ${rootCss} }` : rootCss)
  }
  // return prettified
  return format(output.join('\n'), { parser: 'css', printWidth: 500 })
}
