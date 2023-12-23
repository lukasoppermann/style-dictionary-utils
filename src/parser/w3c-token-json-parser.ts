import type { Parser } from 'style-dictionary/types'

/**
 * @name w3cTokenJsonParser
 * @type parser
 * @description parses json and replace `$value` with `value` and `$description`
 * with `comment` to make it work with style dictionary
 */
export const w3cTokenJsonParser: Parser = {
  pattern: /\.json$|\.tokens\.json$|\.tokens$/,
  parse: ({ contents }) => {
    // replace $value with value so that style dictionary recognizes it
    const preparedContent = (contents || '{}').replace(/"\$?value"\s*:/g, '"value":')
      // convert $description to comment
      .replace(/"\$?description"\s*:/g, '"comment":');
    //
    return JSON.parse(preparedContent);
  },
};
