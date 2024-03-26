import { format } from 'prettier'
import StyleDictionary from 'style-dictionary'
import { jsonToNestedValue } from '../utilities/jsonToNestedValue'
import { jsonToTypes } from '../utilities/jsonToTypes'

const { fileHeader } = StyleDictionary.formatHelpers

export const typescriptEsmDeclarations: StyleDictionary.Formatter = ({ dictionary, file, options, platform = {} }) => {
  const { prefix } = platform
  const tokens = prefix ? { [prefix]: dictionary.tokens } : dictionary.tokens

  // get root name from file options or use default
  const rootName = file.options?.rootName || 'DesignToken'

  // convert to typescript type definition
  const values = jsonToTypes(jsonToNestedValue(tokens), '  ', rootName, true);
  
  const output = fileHeader({ file }) + `${values}\n`
  // return prettified
  return format(output, { parser: 'typescript', printWidth: 500, ...options?.prettier })
}
