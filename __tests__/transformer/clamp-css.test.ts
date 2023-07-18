import StyleDictionary from 'style-dictionary';
import { Matcher } from 'style-dictionary/types/Matcher';
import { gradientCss } from '../../src/transformer/gradient-css';
import { clampCss } from '../../src/transformer/clamp-css';

describe('Transformer: clampCss', () => {
  const items = [{
    value: '',
    $type: 'color',
  }, {
    value: {
        "min": "1.5rem",
        "ideal": "5vw",
        "max": "2.5rem",
      },
    $type: 'clamp',
  }, {
    value: '',
  }] as StyleDictionary.TransformedToken[];

  it('matches `clamp` tokens', () => {
    expect(items.filter(clampCss.matcher as Matcher)).toStrictEqual([items[1]]);
  });

  it('transforms `clamp` tokens', () => {
    expect(items.filter(clampCss.matcher as Matcher).map(item => clampCss.transformer(item, {}))).toStrictEqual([
      "clamp(1.5rem, 5vw, 2.5rem)"
    ]);
  });

})