import StyleDictionary from 'style-dictionary';
import { Matcher } from 'style-dictionary/types/Matcher';
import { gradientCss } from '../../src/transformer/gradient-css';
import { clampCss } from '../../src/transformer/clamp-css';

describe('Transformer: clampCss', () => {
  const items = [{
    value: '',
    $type: 'color',
  }, {
    value: [
        {
          "color": "#ffff00",
          "position": 0.669
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

  it('matches `clamp` tokens', () => {
    expect(items.filter(clampCss.matcher as Matcher)).toStrictEqual([items[1]]);
  });

  it('transforms `clamp` tokens', () => {
    expect(items.filter(clampCss.matcher as Matcher).map(item => clampCss.transformer(item, {}))).toStrictEqual([
      "#ffff00 66%, #ff0000 100%fsad"
    ]);
  });

})