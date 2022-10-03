import StyleDictionary from 'style-dictionary';
import { Matcher } from 'style-dictionary/types/Matcher';
import { colorAlphaToRgba } from '../../src/transformer/color-alpha-to-rgba';

describe('Transformer: colorToRgba', () => {
  const items = [{
    value: '#333',
    $type: 'color',
  }, {
    value: '#343434',
    $type: 'color',
    alpha: .5
  }, {
    value: '',
    $type: 'dimension',
  }, {
    value: '',
  }] as StyleDictionary.TransformedToken[];

  it('matches `color` tokens', () => {
    expect(items.filter(colorAlphaToRgba.matcher as Matcher)).toStrictEqual([items[0], items[1]]);
  });

  it('transforms `color` tokens with hex value', () => {
    expect([
      { value: '#343' },
      { value: '#343434' },
      { value: '#34343466' }
    ].map(item => colorAlphaToRgba.transformer(item as StyleDictionary.TransformedToken))).toStrictEqual([
      "rgba(51, 68, 51, 1)",
      "rgba(52, 52, 52, 1)",
      "rgba(52, 52, 52, 0.4)"
    ]);
  })

  it('transforms `color` tokens with rgb value and keeps alpha values', () => {
    expect([
      { value: 'rgb(100,200,255)' },
      { value: 'rgba(100,200,255, .4)' }
    ].map(item => colorAlphaToRgba.transformer(item as StyleDictionary.TransformedToken))).toStrictEqual([
      'rgba(100, 200, 255, 1)',
      'rgba(100, 200, 255, 0.4)',
    ]);
  })

  it('transforms `color` tokens with alpha', () => {
    expect([
      { value: '#343434', alpha: .4 },
      { value: '#343434cc', alpha: .2 }
      // @ts-expect-error: fake token for test causes error
    ].map(item => colorAlphaToRgba.transformer(item))).toStrictEqual([
      "rgba(52, 52, 52, 0.4)",
      "rgba(52, 52, 52, 0.2)"
    ]);
  })
})