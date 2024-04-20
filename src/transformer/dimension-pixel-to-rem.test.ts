import StyleDictionary from 'style-dictionary';
import { Matcher } from 'style-dictionary/types/Matcher';
import { dimensionPixelToRem } from './dimension-pixel-to-rem';

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
  }] as StyleDictionary.TransformedToken[];

  it('matches `dimension` tokens with pixel value', () => {
    expect(items.filter(dimensionPixelToRem.matcher as Matcher)).toStrictEqual([items[0]]);
  });

  it('transforms `dimension` tokens', () => {
    expect(items.filter(dimensionPixelToRem.matcher as Matcher).map(item => dimensionPixelToRem.transformer(item, {}))).toStrictEqual([
      "1.25rem"
    ]);
  })

  it('transforms `dimension` tokens with custom baseFont', () => {
    const platform = {
      basePxFontSize: 10
    }
    expect(items.filter(dimensionPixelToRem.matcher as Matcher).map(item => dimensionPixelToRem.transformer(item, platform))).toStrictEqual([
      "2rem"
    ]);
  });
})