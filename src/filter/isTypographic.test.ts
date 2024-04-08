import { TransformedToken } from 'style-dictionary/types';
import { isTypographic } from './isTypographic.js';

describe('Filter: isTypographic', () => {
  const items = [{
    value: '300',
    $type: 'fontWeight',
  }, {
    value: '2rem',
    $type: 'dimension',
  }, {
    value: 'Arial',
    type: 'fontFamily',
  }, {
    value: 'Type Style',
    type: 'typography',
  }, {
    value: 'string',
  }] as TransformedToken[];
  it('filters typographic types like fontFamily or typography tokens', () => {
    expect(items.filter(item => isTypographic(item, {}))).toStrictEqual([items[0], items[2], items[3]]);
  });
});
