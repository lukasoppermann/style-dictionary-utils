import { TransformedToken, Filter } from 'style-dictionary/types';

import { dimensionPixelToRem } from './dimension-pixel-to-rem.js';

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

  const filterFn = (item: TransformedToken) => (dimensionPixelToRem.filter as Filter['filter'])(item, {})

  it('matches `dimension` tokens with pixel value', () => {
    expect(items.filter(filterFn)).toStrictEqual([items[0]]);
  });

  it('transforms `dimension` tokens', () => {
    expect(items.filter(filterFn).map(item => dimensionPixelToRem.transform(item, {}, {}))).toStrictEqual([
      "1.25rem"
    ]);
  })

  it('transforms `dimension` tokens with custom baseFont', () => {
    const platform = {
      basePxFontSize: 10
    }
    expect(items.filter(filterFn).map(item => dimensionPixelToRem.transform(item, platform, {}))).toStrictEqual([
      "2rem"
    ]);
  });
})