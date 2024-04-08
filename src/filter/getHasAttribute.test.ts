import { TransformedToken } from 'style-dictionary/types';
import { getHasAttribute } from './getHasAttribute.js';

describe('Filter: hasAttribute', () => {
  const items = [{
    value: '300ms',
    deprecated: true,
  }, {
    value: '2rem',
    $type: 'dimension',
    $deprecated: false,
  }, {
    value: 'string',
  }] as TransformedToken[];

  it('filters type tokens', () => {
    const filterFn = getHasAttribute('deprecated', '$deprecated')
    expect(items.filter(item => filterFn(item, {}))).toStrictEqual([items[0], items[1]]);
  });
});
