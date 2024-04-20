import StyleDictionary from 'style-dictionary';
import { isFontFamily } from './isFontFamily';

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
  }] as StyleDictionary.TransformedToken[];
  it('filters fontFamily tokens', () => {
    expect(items.filter(isFontFamily)).toStrictEqual([items[0], items[2]]);
  });
});
