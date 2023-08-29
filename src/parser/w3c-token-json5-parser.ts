import JSON5 from 'json5';
/**
 * @name w3cTokenJson5Parser
 * @type parser
 * @description parses json5 and replace `$value` with `value` and `$description`
 * with `comment` to make it work with style dictionary
 */
export const w3cTokenJson5Parser = {
  pattern: /\.json[c|5]?$|\.tokens\.json[c|5]?$|\.tokens$/,
  parse: ({ contents }: { contents: string }) => {
    // replace $value with value so that style dictionary recognizes it
    const preparedContent = (contents || '{}').replace(/["']?\$?value["']?\s*:/g, '"value":')
      // convert $description to comment
      .replace(/["']?\$?description["']?\s*:/g, '"comment":');
    //
    return JSON5.parse(preparedContent);
  },
};
