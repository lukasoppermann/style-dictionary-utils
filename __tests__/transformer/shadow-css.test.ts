import { TransformedToken, Filter, Matcher } from 'style-dictionary/types';
import { shadowCss } from '../../src/transformer/shadow-css.js';

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
  }] as TransformedToken[];

  it('matches `shadow` tokens', () => {
    expect(items.filter(shadowCss.matcher as Filter['matcher'])).toStrictEqual([items[1]]);
  });

  it('transforms `shadow` tokens', () => {
    expect(items.filter(shadowCss.matcher as Filter['matcher']).map(item => shadowCss.transformer(item, {}, {}))).toStrictEqual([
      "0px 0px 0px 3px #00000066"
    ]);
  });

  it('should forward `shadow` string', () => {
    const stringItem = {
      value: "0px 0px 0px 2px #00000022",
      $type: 'shadow',
    } as TransformedToken;

    expect(shadowCss.transformer(stringItem, {}, {})).toStrictEqual(
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
          "spread": "3px"
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
      }] as TransformedToken[];

    expect(shadows.filter(shadowCss.matcher as Matcher).map(item => shadowCss.transformer(item, {}, {}))).toStrictEqual([
      "0px 0px 0px 3px #00000066, 2px 2px 4px 0px #ffffff"
    ]);
  })
})