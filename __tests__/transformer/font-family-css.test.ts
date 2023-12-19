import { TransformedToken, Filter } from 'style-dictionary/types';

import { fontFamilyCss } from '../../src/transformer/font-family-css.js';

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

  it('matches `fontFamily` tokens with an array as a value', () => {
    expect(items.filter(fontFamilyCss.matcher as Filter['matcher'])).toStrictEqual([items[1]]);
  });

  it('transforms `fontFamily` array tokens', () => {
    expect(items.filter(fontFamilyCss.matcher as Filter['matcher']).map(item => fontFamilyCss.transformer(item, {}))).toStrictEqual([
      "helvetica, sans-serif, 'Helvetica Neue'"
    ]);
  });
})