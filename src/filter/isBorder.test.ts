import StyleDictionary from 'style-dictionary';
import { isBorder } from './isBorder';

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
  }] as StyleDictionary.TransformedToken[];
  it('filters border tokens', () => {
    expect(items.filter(isBorder)).toStrictEqual([items[0], items[2]]);
  });
});
