import { format } from 'prettier'
import { fileHeader } from 'style-dictionary/utils'
import { FormatFn, FormatFnArguments } from 'style-dictionary/types'
import { jsonToNestedValue } from '../utilities/jsonToNestedValue.js'

export const javascriptCommonJs: FormatFn = async ({ dictionary, file, options, platform = {} }: FormatFnArguments) => {
  const { prefix } = platform
  const tokens = prefix ? { [prefix]: dictionary.tokens } : dictionary.tokens
  //
  const output = await fileHeader({ file }) +
    `exports.default = ${JSON.stringify(jsonToNestedValue(tokens), null, 2)}\n`
  // return prettified
  return format(output, { parser: 'typescript', printWidth: 500, ...options?.prettier })
}
