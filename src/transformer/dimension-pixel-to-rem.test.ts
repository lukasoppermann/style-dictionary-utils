import { TransformedToken } from 'style-dictionary/types';
import { dimensionPixelToRem } from './dimension-pixel-to-rem';

describe('transform: dimensionPixelToRem', () => {
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
    expect(items.filter(dimensionPixelToRem.filter)).toStrictEqual([items[0]]);
  });

  it('transforms `dimension` tokens', () => {
    expect(items.filter(dimensionPixelToRem.filter).map(item => dimensionPixelToRem.transform(item, {}, {}))).toStrictEqual([
      "1.25rem"
    ]);
  })

  it('transforms `dimension` tokens with custom baseFont', () => {
    const platform = {
      basePxFontSize: 10
    }
    expect(items.filter(dimensionPixelToRem.filter).map(item => dimensionPixelToRem.transform(item, platform, {}))).toStrictEqual([
      "2rem"
    ]);
  });
})