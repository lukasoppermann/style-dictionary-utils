import StyleDictionary from 'style-dictionary';
import { Matcher } from 'style-dictionary/types/Matcher';
import { fontFamilyCss } from './font-family-css';

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
  }] as StyleDictionary.TransformedToken[];

  it('matches `fontFamily` tokens with an array as a value', () => {
    expect(items.filter(fontFamilyCss.matcher as Matcher)).toStrictEqual([items[1]]);
  });

  it('transforms `fontFamily` array tokens', () => {
    expect(items.filter(fontFamilyCss.matcher as Matcher).map(item => fontFamilyCss.transformer(item, {}))).toStrictEqual([
      "helvetica, sans-serif, 'Helvetica Neue'"
    ]);
  });
})