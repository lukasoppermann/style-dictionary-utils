import StyleDictionary from 'style-dictionary';
import { isGradient } from './isGradient';

describe('Filter: isGradient', () => {
  const items = [{
    value: '#334455',
    $type: 'gradient',
  }, {
    value: '2rem',
    $type: 'dimension',
  }, {
    value: '#374757',
    type: 'gradient',
  }, {
    value: 'string',
  }] as StyleDictionary.TransformedToken[];
  it('filters gradiet tokens', () => {
    expect(items.filter(isGradient)).toStrictEqual([items[0], items[2]]);
  });
});
