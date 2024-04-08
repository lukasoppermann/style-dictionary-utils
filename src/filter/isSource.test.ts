import { TransformedToken } from 'style-dictionary/types';
import { isSource } from './isSource.js';

describe('Filter: isSource', () => {
  const items = [{
    value: 'red is source',
    isSource: true,
  }, {
    value: 'blue is not source',
    isSource: false,
  }, {
    value: 'yellow is not source',
  }] as TransformedToken[];
  it('filters out non-source items', () => {
    expect(items.filter(item => isSource(item, {}))).toStrictEqual([items[0]]);
  });
});
