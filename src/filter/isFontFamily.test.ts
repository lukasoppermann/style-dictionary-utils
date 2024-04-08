import { TransformedToken } from 'style-dictionary/types';
import { isFontFamily } from './isFontFamily.js';

describe('Filter: isFontFamily', () => {
  const items = [{
    value: '300ms',
    $type: 'fontFamily',
  }, {
    value: '2rem',
    $type: 'dimension',
  }, {
    value: '10ms',
    type: 'fontFamily',
  }, {
    value: 'string',
  }] as TransformedToken[];
  it('filters fontFamily tokens', () => {
    expect(items.filter(item => isFontFamily(item, {}))).toStrictEqual([items[0], items[2]]);
  });
});
