import { TransformedToken } from 'style-dictionary/types';
import { isTypography } from './isTypography.js';

describe('Filter: isTypography', () => {
  const items = [{
    value: '300ms',
    $type: 'typography',
  }, {
    value: '2rem',
    $type: 'dimension',
  }, {
    value: '10ms',
    type: 'typography',
  }, {
    value: 'string',
  }] as TransformedToken[];
  it('filters typography tokens', () => {
    expect(items.filter(item => isTypography(item, {}))).toStrictEqual([items[0], items[2]]);
  });
});
