import StyleDictionary from 'style-dictionary';
import { isColor } from './isColor';

describe('Filter: isColor', () => {
  const items = [{
    value: '#334455',
    $type: 'color',
  }, {
    value: '2rem',
    $type: 'dimension',
  }, {
    value: '#374757',
    type: 'color',
  }, {
    value: 'string',
  }] as StyleDictionary.TransformedToken[];
  it('filters color tokens', () => {
    expect(items.filter(isColor)).toStrictEqual([items[0], items[2]]);
  });
});
