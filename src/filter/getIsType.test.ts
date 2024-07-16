import { TransformedToken } from 'style-dictionary/types';
import { getIsType } from './getIsType';

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
    expect(items.filter(getIsType('border', 'color'))).toStrictEqual([items[0], items[2]]);
  });
});
