import StyleDictionary from 'style-dictionary';
import { Matcher } from 'style-dictionary/types/Matcher';
import { shadowCss } from '../../src/transformer/shadow-css';

describe('Transformer: shadowCss', () => {
  const items = [{
    value: '',
    $type: 'color',
  }, {
    value: {
      "color": "#00000066",
      "x": "0px",
      "y": "0px",
      "blur": "0px",
      "spread": "3px"
    },
    $type: 'shadow',
  }, {
    value: '',
  }] as StyleDictionary.TransformedToken[];

  it('matches `shadow` tokens', () => {
    expect(items.filter(shadowCss.matcher as Matcher)).toStrictEqual([items[0], items[1]]);
  });

  it('transforms `shadow` tokens', () => {
    expect(items.filter(shadowCss.matcher as Matcher).map(item => shadowCss.transformer(item))).toStrictEqual([
      "0px 0px 0px 3px #00000066"
    ]);
  });
})