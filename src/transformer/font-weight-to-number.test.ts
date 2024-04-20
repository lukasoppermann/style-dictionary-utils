import StyleDictionary from 'style-dictionary';
import { Matcher } from 'style-dictionary/types/Matcher';
import { fontWeightToNumber } from './font-weight-to-number';

describe('Transformer: fontWeight', () => {
  const items = [{
    value: 300,
    $type: 'fontWeight',
  }, {
    value: "light",
    $type: 'fontWeight',
  }, {
    value: "300",
    $type: 'fontWeight',
  }, {
    value: '',
  }, {
    value: '',
    $type: 'color',
  }] as StyleDictionary.TransformedToken[];

  it('matches `fontWeight` tokens with a string value', () => {
    expect(items.filter(fontWeightToNumber.matcher as Matcher)).toStrictEqual([items[1], items[2]]);
  });

  it('transforms `fontWeight` string to number', () => {
    expect(items.filter(fontWeightToNumber.matcher as Matcher).map(item => fontWeightToNumber.transformer(item, {}))).toStrictEqual([
      300,
      300
    ]);
  });
})