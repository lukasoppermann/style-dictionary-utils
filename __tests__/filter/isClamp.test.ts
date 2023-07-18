import StyleDictionary from 'style-dictionary';
import { isClamp } from '../../src/filter/isClamp';

describe('Filter: isClamp', () => {
  const items = [{
    value: '300ms',
    $type: 'clamp',
  }, {
    value: '2rem',
    $type: 'dimension',
  }, {
    value: '10ms',
    type: 'clamp',
  }, {
    value: 'string',
  }] as StyleDictionary.TransformedToken[];
  it('filters clamp tokens', () => {
    expect(items.filter(isClamp)).toStrictEqual([items[0], items[2]]);
  });
});