import StyleDictionary from 'style-dictionary';
import { isTransition } from './isTransition';

describe('Filter: isTransition', () => {
  const items = [{
    value: '300ms',
    $type: 'transition',
  }, {
    value: '2rem',
    $type: 'dimension',
  }, {
    value: '10ms',
    type: 'transition',
  }, {
    value: 'string',
  }] as StyleDictionary.TransformedToken[];
  it('filters transition tokens', () => {
    expect(items.filter(isTransition)).toStrictEqual([items[0], items[2]]);
  });
});
