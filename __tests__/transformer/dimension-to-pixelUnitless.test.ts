import { TransformedToken, Filter } from 'style-dictionary/types';

import { dimensionToPixelUnitless } from '../../src/transformer/dimension-to-pixelUnitless.js';

describe('Transformer: dimensionToPixelUnitless', () => {
  const items = [{
    value: '0px',
    $type: 'dimension',
  }, {
    value: '0',
    $type: 'dimension',
  }, {
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

  it('transforms `dimension` tokens', () => {
    expect(items.filter(dimensionToPixelUnitless.matcher as Filter['matcher']).map(item => dimensionToPixelUnitless.transformer(item, {}, {}))).toStrictEqual([
      0,
      0,
      20,
      48,
    ]);
  })

  it('transforms `dimension` tokens with custom baseFont', () => {
    const platform = {
      basePxFontSize: 10
    }
    expect(items.filter(dimensionToPixelUnitless.matcher as Filter['matcher']).map(item => dimensionToPixelUnitless.transformer(item, platform, {}))).toStrictEqual([
      0,
      0,
      20,
      30
    ]);
  });
})