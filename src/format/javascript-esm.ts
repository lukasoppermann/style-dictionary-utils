import { format } from 'prettier'
import { jsonToNestedValue } from '../utilities/jsonToNestedValue'
import { fileHeader } from 'style-dictionary/utils'
import { FormatFn, FormatFnArguments } from 'style-dictionary/types'

export const javascriptEsm: FormatFn = async ({ dictionary, file, options, platform = {} }: FormatFnArguments) => {
  const { prefix } = platform
  const tokens = prefix ? { [prefix]: dictionary.tokens } : dictionary.tokens
  //
  const output = await fileHeader({ file }) +
    `export default \n${JSON.stringify(jsonToNestedValue(tokens), null, 2)}\n`
  // return prettified
  return format(output, { parser: 'typescript', printWidth: 500, ...options?.prettier })
}
