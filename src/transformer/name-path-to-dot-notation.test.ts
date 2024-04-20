import StyleDictionary from 'style-dictionary';
import { namePathToDotNotation } from './name-path-to-dot-notation';

describe('Transformer: namePathToDotNotation', () => {
  const items = [{
    name: "red",
    path: ['base', 'color', 'red'],
  }, {
    name: "red",
    path: ['base', 'red'],
  }] as StyleDictionary.TransformedToken[];

  it('transforms names to dot notation', () => {
    expect(items.map(item => namePathToDotNotation.transformer(item, {}))).toStrictEqual([
      "base.color.red",
      "base.red",
    ]);
  });

  it('adds prefix', () => {
    expect(items.map(item => namePathToDotNotation.transformer(item, { prefix: 'PREFIX' }))).toStrictEqual([
      "PREFIX.base.color.red",
      "PREFIX.base.red",
    ]);
  });

})
