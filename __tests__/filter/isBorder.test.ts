import { TransformedToken } from 'style-dictionary/types';
import { isBorder } from '../../src/filter/isBorder.js';

describe('Filter: isBorder', () => {
  const items = [{
    value: '300ms',
    $type: 'border',
  }, {
    value: '2rem',
    $type: 'dimension',
  }, {
    value: '10ms',
    type: 'border',
  }, {
    value: 'string',
  }] as TransformedToken[];
  it('filters border tokens', () => {
    expect(items.filter(isBorder)).toStrictEqual([items[0], items[2]]);
  });
});
