import StyleDictionary from 'style-dictionary';
import { Matcher } from 'style-dictionary/types/Matcher';
import { shadowCss } from './shadow-css';

describe('Transformer: shadowCss', () => {
  const items = [{
    value: '',
    $type: 'color',
  }, {
    value: {
      "color": "#00000066",
      "offsetX": "0px",
      "offsetY": "0px",
      "blur": "0px",
      "spread": "3px"
    },
    $type: 'shadow',
  }, {
    value: '',
  }] as StyleDictionary.TransformedToken[];

  it('matches `shadow` tokens', () => {
    expect(items.filter(shadowCss.matcher as Matcher)).toStrictEqual([items[1]]);
  });

  it('transforms `shadow` tokens', () => {
    expect(items.filter(shadowCss.matcher as Matcher).map(item => shadowCss.transformer(item, {}))).toStrictEqual([
      "0px 0px 0px 3px #00000066"
    ]);
  });

  it('should forward `shadow` string', () => {
    // @ts-expect-error: missing properties
    const stringItem = {
      value: "0px 0px 0px 2px #00000022",
      $type: 'shadow',
    } as StyleDictionary.TransformedToken;

    expect(shadowCss.transformer(stringItem, {})).toStrictEqual(
      "0px 0px 0px 2px #00000022"
    );
  });

  it('should transform an array of shadow values', () => {
    const shadows = [{
      value: '',
      $type: 'color',
    }, {
      value: [
        {
          "color": "#00000066",
          "offsetX": "0px",
          "offsetY": "0px",
          "blur": "0px",
          "spread": "3px",
          "inset": true
        },
        {
          "color": "#ffffff",
          "offsetX": "2px",
          "offsetY": "2px",
          "blur": "4px",
          "spread": "0px"
        }
      ],
      $type: 'shadow',
    }, {
      value: '',
    }] as StyleDictionary.TransformedToken[];

    expect(shadows.filter(shadowCss.matcher as Matcher).map(item => shadowCss.transformer(item, {}))).toStrictEqual([
      "0px 0px 0px 3px #00000066 inset, 2px 2px 4px 0px #ffffff"
    ]);
  })
})