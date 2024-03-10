import { TransformedToken, Filter } from 'style-dictionary/types';

import { dimensionRemToPixel } from '../../src/transformer/dimension-rem-to-pixel.js';

describe('Transformer: dimensionRemToPixel', () => {
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

  it('matches `dimension` tokens with rem value', () => {
    expect(items.filter(dimensionRemToPixel.matcher as Filter['matcher'])).toStrictEqual([items[1]]);
  });

  it('transforms `dimension` tokens', () => {
    expect(items.filter(dimensionRemToPixel.matcher as Filter['matcher']).map(item => dimensionRemToPixel.transformer(item, {}, {}))).toStrictEqual([
      "48px"
    ]);
  })

  it('transforms `dimension` tokens with custom baseFont', () => {
    const platform = {
      basePxFontSize: 10
    }
    expect(items.filter(dimensionRemToPixel.matcher as Filter['matcher']).map(item => dimensionRemToPixel.transformer(item, platform, {}))).toStrictEqual([
      "30px"
    ]);
  });
})