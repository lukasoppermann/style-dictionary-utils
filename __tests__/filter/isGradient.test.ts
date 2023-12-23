import { TransformedToken } from 'style-dictionary/types';
import { isGradient } from '../../src/filter/isGradient.js';

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
  }] as TransformedToken[];
  it('filters gradiet tokens', () => {
    expect(items.filter(isGradient)).toStrictEqual([items[0], items[2]]);
  });
});
