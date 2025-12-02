import {format} from 'prettier'
import {fileHeader} from 'style-dictionary/utils'
import {Format, FormatFn, FormatFnArguments} from 'style-dictionary/types'
import {jsonToNestedValue} from '../utilities/jsonToNestedValue.js'

const javascriptCommonJsFormat: FormatFn = async ({dictionary, file, options, platform = {}}: FormatFnArguments) => {
  const {prefix} = platform
  const tokens = prefix ? {[prefix]: dictionary.tokens} : dictionary.tokens
  //
  const output =
    (await fileHeader({file})) + `exports.default = ${JSON.stringify(jsonToNestedValue(tokens), null, 2)}\n`
  // return prettified
  return format(output, {parser: 'typescript', printWidth: 500, ...options?.prettier})
}

export const javascriptCommonJs: Format = {
  name: 'javascript/commonJs',
  format: javascriptCommonJsFormat,
}
