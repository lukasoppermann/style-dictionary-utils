import StyleDictionary from 'style-dictionary';
import { colorToRgba } from './color-to-rgba';

describe('Transformer: colorToHex', () => {

  it('transforms `color` tokens with hex value', () => {
    expect([
      { value: '#343' },
      { value: '#343434' },
      { value: '#34343466' }
    ].map(item => colorToRgba.transformer(item as StyleDictionary.TransformedToken, {}))).toStrictEqual([
      "rgba(51, 68, 51, 1)",
      "rgba(52, 52, 52, 1)",
      "rgba(52, 52, 52, 0.4)"
    ]);
  })

  it('transforms `color` tokens with rgb value', () => {
    expect([
      { value: 'rgb(100,200,255)' },
      { value: 'rgba(100,200,255, .4)' }
    ].map(item => colorToRgba.transformer(item as StyleDictionary.TransformedToken, {}))).toStrictEqual([
      "rgba(100, 200, 255, 1)",
      "rgba(100, 200, 255, 0.4)",
    ]);
  })

  it('transforms `color` tokens and ignores alpha value', () => {
    expect([
      { value: '#343434', alpha: .4 },
      { value: '#34343466', alpha: .8 }
      // @ts-expect-error: fake token for test causes error
    ].map(item => colorToRgba.transformer(item))).toStrictEqual([
      "rgba(52, 52, 52, 1)",
      "rgba(52, 52, 52, 0.4)"
    ]);
  })

  it('transforms `named colors` and `transparent` to rgb value', () => {
    const input = [{ value: 'purple' }, { value: 'transparent' }]
    const expectedOutput = [
      "rgba(128, 0, 128, 1)",
      "rgba(0, 0, 0, 0)",
    ]
    expect(input.map(item => colorToRgba.transformer(item as StyleDictionary.TransformedToken, {}))).toStrictEqual(expectedOutput)
  })
})