import { TransformedToken } from 'style-dictionary/types';
import { isColorOrGradient } from '../../src/filter/isColorOrGradient.js';

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
  }] as TransformedToken[];
  it('filters color and gradient tokens', () => {
    expect(items.filter(isColorOrGradient)).toStrictEqual([items[0], items[2]]);
  });
});
