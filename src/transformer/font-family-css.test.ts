import { TransformedToken, Filter } from 'style-dictionary/types';

import { fontFamilyCss } from './font-family-css.js';

describe('Transformer: fontFamily', () => {
  const items = [{
    value: 'Helvetica',
    $type: 'fontFamily',
  }, {
    value: ["helvetica", 'sans-serif', 'Helvetica Neue'],
    $type: 'fontFamily',
  }, {
    value: '',
  }, {
    value: '',
    $type: 'color',
  }] as TransformedToken[];

  const filterFn = (item: TransformedToken) => (fontFamilyCss.filter as Filter['filter'])(item, {})

  it('matches `fontFamily` tokens with an array as a value', () => {
    expect(items.filter(filterFn)).toStrictEqual([items[1]]);
  });

  it('transforms `fontFamily` array tokens', () => {
    expect(items.filter(filterFn).map(item => fontFamilyCss.transform(item, {}, {}))).toStrictEqual([
      "helvetica, sans-serif, 'Helvetica Neue'"
    ]);
  });
})