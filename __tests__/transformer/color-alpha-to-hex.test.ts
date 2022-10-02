import StyleDictionary from 'style-dictionary';
import { Matcher } from 'style-dictionary/types/Matcher';
import { colorAlphaToHex } from '../../src/transformer/color-alpha-to-hex';

describe('Transformer: colorAlphaToHex', () => {
  const items = [{
    value: '#333',
    $type: 'color',
  }, {
    value: '#343434',
    $type: 'color',
  }, {
    value: '',
    $type: 'color',
  }, {
    value: '',
    $type: 'dimension',
  }, {
    value: '',
  }] as StyleDictionary.TransformedToken[];

  it('matches `color` tokens', () => {
    expect(items.filter(colorAlphaToHex.matcher as Matcher)).toStrictEqual([items[0], items[1], items[2]]);
  });

  it('transforms `color` tokens with hex value', () => {
    expect([
      { value: '#343' },
      { value: '#343434' },
      { value: '#34343466' }
    ].map(item => colorAlphaToHex.transformer(item as StyleDictionary.TransformedToken))).toStrictEqual([
      "#334433",
      "#343434",
      "#34343466"
    ]);
  })

  it('transforms `color` tokens with rgb value', () => {
    expect([
      { value: 'rgb(100,200,255)' },
      { value: 'rgba(100,200,255, .4)' }
    ].map(item => colorAlphaToHex.transformer(item as StyleDictionary.TransformedToken))).toStrictEqual([
      "#64c8ff",
      "#64c8ff66",
    ]);
  })

  it('transforms `color` tokens and ignores alpha value', () => {
    expect([
      { value: '#343434', alpha: .4 },
      { value: '#34343466', alpha: .4 }
      // @ts-expect-error: fake token for test causes error
    ].map(item => colorAlphaToHex.transformer(item))).toStrictEqual([
      "#34343466",
      "#34343400"
    ]);
  })
})