import type { Format } from 'style-dictionary/types'
import { fileHeader } from 'style-dictionary/utils'
// Currently, Style-Dictionary does not yet support async formats, and prettier has changed to async now from v3 onwards
import { jsonToNestedValue } from '../utilities/jsonToNestedValue.js'
import syncPrettier from '@prettier/sync'


export const javascriptCommonJs: Format['formatter'] = async ({ dictionary, file, options, platform = {} }) => {
  const { prefix } = platform
  const tokens = prefix ? { [prefix]: dictionary.tokens } : dictionary.tokens
  //
  const output = await fileHeader({ file }) +
    `exports.default = ${JSON.stringify(jsonToNestedValue(tokens), null, 2)}\n`
  // return prettified
  return syncPrettier.format(output, { parser: 'typescript', printWidth: 500, ...options?.prettier })
}
