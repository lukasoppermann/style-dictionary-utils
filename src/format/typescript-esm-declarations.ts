import { format } from 'prettier'
import StyleDictionary from 'style-dictionary'
import { Formatter } from 'style-dictionary/types'
import { jsonToNestedValue } from '../utilities/jsonToNestedValue.js'
import { jsonToTypes } from '../utilities/jsonToTypes.js'

const { fileHeader } = StyleDictionary.formatHelpers

export const typescriptEsmDeclarations: Formatter = async ({ dictionary, file, options, platform = {} }) => {
  const { prefix } = platform
  const tokens = prefix ? { [prefix]: dictionary.tokens } : dictionary.tokens

  // get root name from file options or use default
  const rootName = file.options?.rootName || 'DesignToken'

  // convert to typescript type definition
  const values = jsonToTypes(jsonToNestedValue(tokens), '  ', rootName, true);
  
  const output = await fileHeader({ file }) + `${values}\n`
  // return prettified
  const formatted = await format(output, {
    parser: 'typescript', printWidth: 500, ...options?.
      prettier
  })
  return formatted
}
