import JSON5 from 'json5'
/**
 * @name w3cTokenJson5Parser
 * @type parser
 * @description parses json5 and replace `$value` with `value` and `$description` with `comment` to make it work with style dictionary
 */
export const w3cTokenJson5Parser = {
  pattern: /\.json$/,
  parse: ({ contents }: { contents: string }) => {
    // replace $value with value so that style dictionary recognizes it
    contents = (contents || "{}").replace(/"\$(value)":/g, '"$1":')
      // convert $description to comment
      .replace(/"\$description":/g, '"comment":')
    //
    return JSON5.parse(contents)
  }
}