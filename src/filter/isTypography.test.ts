import StyleDictionary from 'style-dictionary';
import { isTypography } from './isTypography';

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
  }] as StyleDictionary.TransformedToken[];
  it('filters typography tokens', () => {
    expect(items.filter(isTypography)).toStrictEqual([items[0], items[2]]);
  });
});
