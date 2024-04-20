import StyleDictionary from 'style-dictionary';
import { Matcher } from 'style-dictionary/types/Matcher';
import { clampCss } from './clamp-css';

describe('Transformer: clampCss', () => {
  const items = [{
    value: '',
    $type: 'clamp',
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

  it('transforms `clamp` tokens with modified ideal value', () => {
    const idealClamp = [{
      value: {
        "min": "1.5rem",
        "ideal": "0.5vw + 0.75rem",
        "max": "2.5rem",
      },
      $type: 'clamp',
    }, {
      value: '',
    }] as StyleDictionary.TransformedToken[];
    expect(idealClamp.filter(clampCss.matcher as Matcher).map(item => clampCss.transformer(item, {}))).toStrictEqual([
      "clamp(1.5rem, 0.5vw + 0.75rem, 2.5rem)"
    ]);
  });
})