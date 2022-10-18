import StyleDictionary from 'style-dictionary'
import {format} from 'prettier'
import {jsonToNestedValue} from '../utilities/jsonToNestedValue'

const {fileHeader} = StyleDictionary.formatHelpers

export const javascriptCommonJs: StyleDictionary.Formatter = ({
  dictionary,
  file,
  options: _options,
  platform = {}
}) => {
  const {prefix} = platform
  let tokens = dictionary.tokens
  // add prefix if defined
  if (prefix) {
    tokens = {[prefix]: tokens}
  }

  const output = `${fileHeader({file})}exports.default = ${JSON.stringify(jsonToNestedValue(tokens), null, 2)}\n`
  // return prettified
  return format(output, {parser: 'typescript', printWidth: 500})
}
