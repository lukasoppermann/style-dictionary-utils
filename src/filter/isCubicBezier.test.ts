import StyleDictionary from 'style-dictionary';
import { isCubicBezier } from './isCubicBezier';

describe('Filter: isCubicBezier', () => {
  const items = [{
    value: '300ms',
    $type: 'cubicBezier',
  }, {
    value: '2rem',
    $type: 'dimension',
  }, {
    value: '10ms',
    type: 'cubicBezier',
  }, {
    value: 'string',
  }] as StyleDictionary.TransformedToken[];
  it('filters cubicBezier tokens', () => {
    expect(items.filter(isCubicBezier)).toStrictEqual([items[0], items[2]]);
  });
});
