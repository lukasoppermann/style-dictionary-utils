import {format} from 'prettier'
import {jsonToNestedValue} from '../utilities/jsonToNestedValue.js'
import {fileHeader} from 'style-dictionary/utils'
import {Format, FormatFn, FormatFnArguments} from 'style-dictionary/types'

const javascriptEsmFormat: FormatFn = async ({dictionary, file, options, platform = {}}: FormatFnArguments) => {
  const {prefix} = platform
  const tokens = prefix ? {[prefix]: dictionary.tokens} : dictionary.tokens
  //
  const output = (await fileHeader({file})) + `export default \n${JSON.stringify(jsonToNestedValue(tokens), null, 2)}\n`
  // return prettified
  return format(output, {parser: 'typescript', printWidth: 500, ...options?.prettier})
}

export const javascriptEsm: Format = {
  name: 'javascript/esm',
  format: javascriptEsmFormat,
}
