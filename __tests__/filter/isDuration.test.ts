import { TransformedToken } from 'style-dictionary/types';
import { isDuration } from '../../src/filter/isDuration.js';

describe('Filter: isDuration', () => {
  const items = [{
    value: '300ms',
    $type: 'duration',
  }, {
    value: '2rem',
    $type: 'dimension',
  }, {
    value: '10ms',
    type: 'duration',
  }, {
    value: 'string',
  }] as TransformedToken[];
  it('filters duration tokens', () => {
    expect(items.filter(isDuration)).toStrictEqual([items[0], items[2]]);
  });
});
