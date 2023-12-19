import { TransformedToken } from 'style-dictionary/types';
import { isDimension } from '../../src/filter/isDimension.js';

describe('Filter: isDimension', () => {
  const items = [{
    value: '2rem',
    $type: 'dimension',
  }, {
    value: '#234589',
    $type: 'color',
  }, {
    value: '12px',
    type: 'dimension',
  }, {
    value: 'a string',
  }] as TransformedToken[];
  it('filters dimension tokens', () => {
    expect(items.filter(isDimension)).toStrictEqual([items[0], items[2]]);
  });
});
