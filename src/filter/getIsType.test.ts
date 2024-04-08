import { TransformedToken } from 'style-dictionary/types';
import { getIsType } from './getIsType.js';

describe('Filter: getIsType', () => {
  const items = [{
    value: '300ms',
    $type: 'border',
  }, {
    value: '2rem',
    $type: 'dimension',
  }, {
    value: '#345622',
    type: 'color',
  }, {
    value: 'string',
  }] as TransformedToken[];
  it('filters type tokens', () => {
    const filterFn = getIsType('border', 'color')
    expect(items.filter(item => filterFn(item, {}))).toStrictEqual([items[0], items[2]]);
  });
});
