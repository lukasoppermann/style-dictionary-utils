import { fileHeader } from 'style-dictionary/utils'
import type { Format } from 'style-dictionary/types';
// Currently, Style-Dictionary does not yet support async formats, and prettier has changed to async now from v3 onwards
import syncPrettier from '@prettier/sync'
import { jsonToNestedValue } from '../utilities/jsonToNestedValue.js'


export const javascriptEsm: Format['formatter'] = async ({ dictionary, file, options, platform = {} }) => {
  const { prefix } = platform
  const tokens = prefix ? { [prefix]: dictionary.tokens } : dictionary.tokens
  //
  const output = await fileHeader({ file }) +
    `export default \n${JSON.stringify(jsonToNestedValue(tokens), null, 2)}\n`
  // return prettified
  return syncPrettier.format(output, { parser: 'typescript', printWidth: 500, ...options?.prettier })
}
