import { w3cTokenJsonParser } from './w3c-token-json-parser';

describe('Parser: w3c token json parser', () => {
  it('parses valid json', () => {
    expect(w3cTokenJsonParser.parse({
      contents: `{
      "color": {
        "$value": "red",
        "$description": "a red color",
        "$type": "color",
        "alpha": 0.5
      },
      "token": {
        "value": "green",
        "description": "a red color",
        "type": "color"
      }
    }`,
    })).toStrictEqual({
      color: {
        comment: 'a red color',
        value: 'red',
        $type: 'color',
        alpha: 0.5,
      },
      token: {
        comment: 'a red color',
        value: 'green',
        type: 'color',
      },
    });
  });

  it('parses valid with whitespace before colon', () => {
    expect(w3cTokenJsonParser.parse({
      contents: `{
      "color": {
        "$value" : "red",
        "$description"  : "a red color",
        "$type" : "color",
        "alpha": 0.5
      }
    }`,
    })).toStrictEqual({
      color: {
        comment: 'a red color',
        value: 'red',
        $type: 'color',
        alpha: 0.5,
      }
    });
  });

  it('parses empty json', () => {
    expect(w3cTokenJsonParser.parse({ contents: '' })).toStrictEqual({});
  });

  it('throws on json5', () => {
    expect(() => {
      w3cTokenJsonParser.parse(
        {
          contents: `{
          "color": {
            "$value": "red",
            // comment
            "$description": 'a red color',
            "alpha": 0.5,
          },
        }`,
        },
      );
    }).toThrowError();
  });
});
