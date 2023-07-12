import StyleDictionary from 'style-dictionary';
import { Matcher } from 'style-dictionary/types/Matcher';
import { dimensionToPixelUnitless } from '../../src/transformer/dimension-to-pixelUnitless';

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
    expect(items.filter(dimensionToPixelUnitless.matcher as Matcher).map(item => dimensionToPixelUnitless.transformer(item))).toStrictEqual([
      20,
      48,
    ]);
  })

  it('transforms `dimension` tokens with custom baseFont', () => {
    const platform = {
      basePxFontSize: 10
    }
    expect(items.filter(dimensionToPixelUnitless.matcher as Matcher).map(item => dimensionToPixelUnitless.transformer(item, platform))).toStrictEqual([
      20,
      30
    ]);
  });
})