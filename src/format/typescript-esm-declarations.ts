import { format } from 'prettier'
import { fileHeader } from 'style-dictionary/utils'
import { jsonToNestedValue } from '../utilities/jsonToNestedValue'
import { jsonToTypes } from '../utilities/jsonToTypes'
import { FormatFn, FormatFnArguments } from 'style-dictionary/types'

export const typescriptEsmDeclarations: FormatFn = async ({ dictionary, file, options, platform = {} }: FormatFnArguments) => {
  const { prefix } = platform
  const tokens = prefix ? { [prefix]: dictionary.tokens } : dictionary.tokens

  // get root name from file options or use default
  const rootName = file.options?.rootName || 'DesignToken'

  // convert to typescript type definition
  const values = jsonToTypes(jsonToNestedValue(tokens), '  ', rootName, true);
  
  const output = await fileHeader({ file }) + `${values}\n`
  // return prettified
  return format(output, { parser: 'typescript', printWidth: 500, ...options?.prettier })
}
