import StyleDictionary from 'style-dictionary';
import { Matcher } from 'style-dictionary/types/Matcher';
import { gradientCss } from '../../src/transformer/gradient-css';

describe('Transformer: gradientCss', () => {
  const items = [{
    value: '',
    $type: 'color',
  }, {
    value: [
        {
          "color": "#ffff00",
          "position": 0.666
        },
        {
          "color": "#ff0000",
          "position": 1
        }
      ],
    $type: 'gradient',
  }, {
    value: '',
  }] as StyleDictionary.TransformedToken[];

  it('matches `gradient` tokens', () => {
    expect(items.filter(gradientCss.matcher as Matcher)).toStrictEqual([items[1]]);
  });

  it('transforms `gradient` tokens', () => {
    expect(items.filter(gradientCss.matcher as Matcher).map(item => gradientCss.transformer(item))).toStrictEqual([
        "#ffff00 0.666",
        "#ff0000 1"
    ]);
  });
})