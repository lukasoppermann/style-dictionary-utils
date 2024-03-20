import StyleDictionary from 'style-dictionary';
import { variablesCss } from '../../src/transformer/variables-css';

describe('Transformer: variablesCss', () => {
  const items = [{
    name: "red",
  }, {
    name: "white",
  }] as StyleDictionary.TransformedToken[];

  it('transforms names to CSS variable notation', () => {
    expect(items.map(item => variablesCss.transformer(item, {}))).toStrictEqual([
      "var(--red)",
      "var(--white)",
    ]);
  });

  it('adds prefix to CSS variable notation', () => {
    expect(items.map(item => variablesCss.transformer(item, { cssVarPrefix: 'PREFIX' }))).toStrictEqual([
      "var(--PREFIX-red)",
      "var(--PREFIX-white)",
    ]);
  });

})
