import { TransformedToken, Filter } from 'style-dictionary/types';
import { fontWeightToNumber } from '../../src/transformer/font-weight-to-number.js';

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
  }] as TransformedToken[];

  it('matches `fontWeight` tokens with a string value', () => {
    expect(items.filter(fontWeightToNumber.matcher as Filter['matcher'])).toStrictEqual([items[1], items[2]]);
  });

  it('transforms `fontWeight` string to number', () => {
    expect(items.filter(fontWeightToNumber.matcher as Filter['matcher']).map(item => fontWeightToNumber.transformer(item, {}))).toStrictEqual([
      300,
      300
    ]);
  });
})