import { fileHeader } from 'style-dictionary/utils'
import type { FormatFn } from 'style-dictionary/types';
import {format} from 'prettier'
import { jsonToNestedValue } from '../utilities/jsonToNestedValue.js'

export const javascriptEsm: FormatFn = async ({ dictionary, file, options, platform = {} }) => {
  const { prefix } = platform
  const tokens = prefix ? { [prefix]: dictionary.tokens } : dictionary.tokens
  //
  const output = await fileHeader({ file }) +
    `export default \n${JSON.stringify(jsonToNestedValue(tokens), null, 2)}\n`
  // return prettified
  return format(output, { parser: 'typescript', printWidth: 500, ...options?.prettier })
}
