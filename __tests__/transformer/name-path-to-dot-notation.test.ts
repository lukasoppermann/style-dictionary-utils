import StyleDictionary from 'style-dictionary';
import { namePathToDotNotation } from '../../src/transformer/name-path-to-dot-notation';

describe('Transformer: namePathToDotNotation', () => {
  const items = [{
    name: "red",
    path: ['base', 'color', 'red'],
  }, {
    name: "red",
    path: ['base', 'red'],
  }] as StyleDictionary.TransformedToken[];

  it('transforms `fontFamily` array tokens', () => {
    expect(items.map(item => namePathToDotNotation.transformer(item))).toStrictEqual([
      "base.color.red",
      "base.red",
    ]);
  });
})