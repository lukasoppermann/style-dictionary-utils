import { TransformedToken, Filter } from 'style-dictionary/types';

import { shadowCss } from '../../src/transformer/shadow-css.js';

describe('Transformer: shadowCss', () => {
  const items = [{
    value: '',
    $type: 'color',
  }, {
    value: {
      "color": "#00000066",
      "offsetX": "0px",
      "offsetY": "0px",
      "blur": "0px",
      "spread": "3px"
    },
    $type: 'shadow',
  }, {
    value: '',
  }] as TransformedToken[];

  it('matches `shadow` tokens', () => {
    expect(items.filter(shadowCss.matcher as Filter['matcher'])).toStrictEqual([items[1]]);
  });

  it('transforms `shadow` tokens', () => {
    expect(items.filter(shadowCss.matcher as Filter['matcher']).map(item => shadowCss.transformer(item, {}))).toStrictEqual([
      "0px 0px 0px 3px #00000066"
    ]);
  });
})