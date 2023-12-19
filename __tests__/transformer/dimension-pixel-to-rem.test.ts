import { TransformedToken, Filter } from 'style-dictionary/types';

import { dimensionPixelToRem } from '../../src/transformer/dimension-pixel-to-rem.js';

describe('Transformer: dimensionPixelToRem', () => {
  const items = [{
    value: '20px',
    $type: 'dimension',
  }, {
    value: '3rem',
    $type: 'dimension',
  }, {
    value: '',
    $type: 'color',
  }, {
    value: '',
  }] as TransformedToken[];

  it('matches `dimension` tokens with pixel value', () => {
    expect(items.filter(dimensionPixelToRem.matcher as Filter['matcher'])).toStrictEqual([items[0]]);
  });

  it('transforms `dimension` tokens', () => {
    expect(items.filter(dimensionPixelToRem.matcher as Filter['matcher']).map(item => dimensionPixelToRem.transformer(item, {}))).toStrictEqual([
      "1.25rem"
    ]);
  })

  it('transforms `dimension` tokens with custom baseFont', () => {
    const platform = {
      basePxFontSize: 10
    }
    expect(items.filter(dimensionPixelToRem.matcher as Filter['matcher']).map(item => dimensionPixelToRem.transformer(item, platform))).toStrictEqual([
      "2rem"
    ]);
  });
})