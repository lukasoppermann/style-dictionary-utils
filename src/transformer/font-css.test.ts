import StyleDictionary from 'style-dictionary';
import { Matcher } from 'style-dictionary/types/Matcher';
import { fontCss } from './font-css';

describe('Transformer: fontFamily', () => {
  const items = [{
    value: {
      "fontWeight": 500,
      "fontSize": "16px",
      "lineHeight": "22px",
      "fontFamily": "Helvetica",
      "fontStyle": "italic"
    },
    $type: 'typography',
  }, {
    value: {
      "fontSize": "16px",
      "fontFamily": "Helvetica",
    },
    $type: 'typography',
  }, {
    value: '',
  }, {
    value: '',
    $type: 'color',
  }] as StyleDictionary.TransformedToken[];

  it('matches `fontFamily` tokens with an array as a value', () => {
    expect(items.filter(fontCss.matcher as Matcher)).toStrictEqual([items[0], items[1]]);
  });

  it('transforms `fontFamily` array tokens', () => {
    expect(items.filter(fontCss.matcher as Matcher).map(item => fontCss.transformer(item, {}))).toStrictEqual([
      "italic 500 16px/22px Helvetica",
      "16px Helvetica",
    ]);
  });
})