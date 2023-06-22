import StyleDictionary from 'style-dictionary';
import { Matcher } from 'style-dictionary/types/Matcher';
import { gradientCss } from '../../src/transformer/gradient-css';

describe('Transformer: gradientCss', () => {
  const items = [{
    value: '',
    $type: 'color',
  }, {
    value: {
      "color1": "#FF0000",
      "color2": "#0000FF",
      "angle": "90deg"
    },
    $type: 'gradient',
  }, {
    value: '',
  }] as StyleDictionary.TransformedToken[];

  it('matches `gradient` tokens', () => {
    expect(items.filter(gradientCss.matcher as Matcher)).toStrictEqual([items[1]]);
  });

  it('transforms `gradient` tokens', () => {
    expect(items.filter(gradientCss.matcher as Matcher).map(item => gradientCss.transformer(item))).toStrictEqual([
      "#FF0000 #0000FF 90deg"
    ]);
  });
})