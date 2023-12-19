import { TransformedToken } from 'style-dictionary/types';
import { getHasAttribute } from '../../src/filter/getHasAttribute.js';

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
    expect(items.filter(getHasAttribute('deprecated', '$deprecated'))).toStrictEqual([items[0], items[1]]);
  });
});
