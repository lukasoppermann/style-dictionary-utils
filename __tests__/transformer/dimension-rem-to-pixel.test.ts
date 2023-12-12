import StyleDictionary from 'style-dictionary';

import { dimensionRemToPixel } from '../../src/transformer/dimension-rem-to-pixel';

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
  }] as StyleDictionary.TransformedToken[];

  it('matches `dimension` tokens with rem value', () => {
    expect(items.filter(dimensionRemToPixel.matcher as StyleDictionary.Matcher)).toStrictEqual([items[1]]);
  });

  it('transforms `dimension` tokens', () => {
    expect(items.filter(dimensionRemToPixel.matcher as StyleDictionary.Matcher).map(item => dimensionRemToPixel.transformer(item, {}))).toStrictEqual([
      "48px"
    ]);
  })

  it('transforms `dimension` tokens with custom baseFont', () => {
    const platform = {
      basePxFontSize: 10
    }
    expect(items.filter(dimensionRemToPixel.matcher as StyleDictionary.Matcher).map(item => dimensionRemToPixel.transformer(item, platform))).toStrictEqual([
      "30px"
    ]);
  });
})