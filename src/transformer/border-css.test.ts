import { TransformedToken } from 'style-dictionary/types';
import { borderCss } from './border-css.js';
import { getMockToken } from '../test-utilities/getMockToken.js';


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
    expect(items.map(item => borderCss.transform(item as TransformedToken, {}, {}))).toStrictEqual([
      "1px dashed #334455",
      "5px solid #33445566",
    ]);
  });
})