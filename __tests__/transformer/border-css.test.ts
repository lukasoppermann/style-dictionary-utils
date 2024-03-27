import { TransformedToken } from 'style-dictionary/types';
import { borderCss } from '../../src/transformer/border-css.js';
import { getMockToken } from '../../src/testUtilities/getMockToken.js';


describe('Transformer: border', () => {
  const items = [getMockToken({
    value: {
      color: '#334455',
      width: '1px',
      style: 'dashed'
    },
    $type: 'border',
  }), getMockToken({
    value: {
      color: '#33445566',
      width: '5px',
      style: 'solid'
    },
    $type: 'border',
  })];

  it('transforms `border` tokens', () => {
    expect(items.map(item => borderCss.transformer(item as TransformedToken, {}, {}))).toStrictEqual([
      "1px dashed #334455",
      "5px solid #33445566",
    ]);
  });
})