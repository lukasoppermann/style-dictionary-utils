import StyleDictionary from 'style-dictionary';
import { Matcher } from 'style-dictionary/types/Matcher';
import { dimensionToFloat } from '../../src/transformer/dimension-to-float';

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

  it('transforms `dimension` tokens', () => {
    expect(items.filter(dimensionToFloat.matcher as Matcher).map(item => dimensionToFloat.transformer(item))).toStrictEqual([
      20,
      48,
    ]);
  })

  it('transforms `dimension` tokens with custom baseFont', () => {
    const platform = {
      basePxFontSize: 10
    }
    expect(items.filter(dimensionToFloat.matcher as Matcher).map(item => dimensionToFloat.transformer(item, platform))).toStrictEqual([
      20,
      30
    ]);
  });
})