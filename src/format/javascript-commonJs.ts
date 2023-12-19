import StyleDictionary from 'style-dictionary';
import type { Format } from 'style-dictionary/types'
// Currently, Style-Dictionary does not yet support async formats, and prettier has changed to async now from v3 onwards
import syncPrettier from '@prettier/sync'
import { jsonToNestedValue } from '../utilities/jsonToNestedValue.js'

const { fileHeader } = StyleDictionary.formatHelpers

export const javascriptCommonJs: Format['formatter'] = ({ dictionary, file, options, platform = {} }) => {
  const { prefix } = platform
  const tokens = prefix ? { [prefix]: dictionary.tokens } : dictionary.tokens
  //
  const output = fileHeader({ file }) +
    `exports.default = ${JSON.stringify(jsonToNestedValue(tokens), null, 2)}\n`
  // return prettified
  return syncPrettier.format(output, { parser: 'typescript', printWidth: 500, ...options?.prettier })
}
