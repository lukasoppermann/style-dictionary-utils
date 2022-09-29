import { w3cTokenJson5Parser } from '../../src/parser/w3c-token-json5-parser';

describe('Parser: w3c token json5 parser', () => {
  it('parses valid json5', () => {
    expect(w3cTokenJson5Parser.parse({
      contents: `{
      "color": {
        // comment
        "$value": 'red',
        "$description": "a red color",
        "$type": "color",
        alpha: 0.5
      }
    }`,
    })).toStrictEqual({
      color: {
        comment: 'a red color',
        value: 'red',
        $type: 'color',
        alpha: 0.5,
      },
    });
  });

  it('parses empty json', () => {
    expect(w3cTokenJson5Parser.parse({ contents: '' })).toStrictEqual({});
  });
});
