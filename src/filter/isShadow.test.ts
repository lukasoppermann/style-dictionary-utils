import StyleDictionary from 'style-dictionary';
import { isShadow } from './isShadow';

describe('Filter: isShadow', () => {
  const items = [{
    value: '300ms',
    $type: 'shadow',
  }, {
    value: '2rem',
    $type: 'dimension',
  }, {
    value: '10ms',
    type: 'shadow',
  }, {
    value: 'string',
  }] as StyleDictionary.TransformedToken[];
  it('filters shadow tokens', () => {
    expect(items.filter(isShadow)).toStrictEqual([items[0], items[2]]);
  });
});
