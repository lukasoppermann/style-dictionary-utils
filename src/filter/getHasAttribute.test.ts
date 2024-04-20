import StyleDictionary from 'style-dictionary';
import { getHasAttribute } from './getHasAttribute';

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
  }] as StyleDictionary.TransformedToken[];

  it('filters type tokens', () => {
    expect(items.filter(getHasAttribute('deprecated', '$deprecated'))).toStrictEqual([items[0], items[1]]);
  });
});
