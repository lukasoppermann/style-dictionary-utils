import StyleDictionary from 'style-dictionary';
import { isColorOrGradient } from './isColorOrGradient';

describe('Filter: isColorAndGradient', () => {
  const items = [{
    value: '#334455',
    $type: 'color',
  }, {
    value: '2rem',
    $type: 'dimension',
  }, {
    value: '#374757',
    type: 'gradient',
  }, {
    value: 'string',
  }] as StyleDictionary.TransformedToken[];
  it('filters color and gradient tokens', () => {
    expect(items.filter(isColorOrGradient)).toStrictEqual([items[0], items[2]]);
  });
});
