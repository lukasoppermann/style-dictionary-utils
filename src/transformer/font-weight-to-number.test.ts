import { TransformedToken, Filter } from 'style-dictionary/types';
import { fontWeightToNumber } from './font-weight-to-number.js';

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

  const filterFn = (item: TransformedToken) => (fontWeightToNumber.filter as Filter['filter'])(item, {})

  it('matches `fontWeight` tokens with a string value', () => {
    expect(items.filter(filterFn)).toStrictEqual([items[1], items[2]]);
  });

  it('transforms `fontWeight` string to number', () => {
    expect(items.filter(filterFn).map(item => fontWeightToNumber.transform(item, {}, {}))).toStrictEqual([
      300,
      300
    ]);
  });
})