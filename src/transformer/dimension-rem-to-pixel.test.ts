import { TransformedToken, Filter } from 'style-dictionary/types';

import { dimensionRemToPixel } from './dimension-rem-to-pixel.js';

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

  const filterFn = (item: TransformedToken) => (dimensionRemToPixel.filter as Filter['filter'])(item, {})

  it('matches `dimension` tokens with rem value', () => {
    expect(items.filter(filterFn)).toStrictEqual([items[1]]);
  });

  it('transforms `dimension` tokens', () => {
    expect(items.filter(filterFn).map(item => dimensionRemToPixel.transform(item, {}, {}))).toStrictEqual([
      "48px"
    ]);
  })

  it('transforms `dimension` tokens with custom baseFont', () => {
    const platform = {
      basePxFontSize: 10
    }
    expect(items.filter(filterFn).map(item => dimensionRemToPixel.transform(item, platform, {}))).toStrictEqual([
      "30px"
    ]);
  });
})