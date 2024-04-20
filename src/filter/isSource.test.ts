import StyleDictionary from 'style-dictionary';
import { isSource } from './isSource';

describe('Filter: isSource', () => {
  const items = [{
    value: 'red is source',
    isSource: true,
  }, {
    value: 'blue is not source',
    isSource: false,
  }, {
    value: 'yellow is not source',
  }] as StyleDictionary.TransformedToken[];
  it('filters out non-source items', () => {
    expect(items.filter(isSource)).toStrictEqual([items[0]]);
  });
});
