import { TransformedToken, Filter } from 'style-dictionary/types';

import { clampCss } from '../../src/transformer/clamp-css.js';

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
  }] as TransformedToken[];

  it('matches `clamp` tokens', () => {
    expect(items.filter(clampCss.matcher as Filter['matcher'])).toStrictEqual([items[1]]);
  });

  it('transforms `clamp` tokens', () => {
    expect(items.filter(clampCss.matcher as Filter['matcher']).map(item => clampCss.transformer(item, {}))).toStrictEqual([
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
      }] as TransformedToken[];
    expect(idealClamp.filter(clampCss.matcher as Filter['matcher']).map(item => clampCss.transformer(item, {}))).toStrictEqual([
      "clamp(1.5rem, 0.5vw + 0.75rem, 2.5rem)"
    ]);
  });
})