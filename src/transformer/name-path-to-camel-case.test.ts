import StyleDictionary from 'style-dictionary';
import { namePathToCamelCase } from './name-path-to-camel-case';

describe('Transformer: namePathToCamelCase', () => {
  const items = [{
    name: "red",
    path: ['base', 'color', 'red'],
  }, {
    name: "red",
    path: ['base', 'red'],
  }] as StyleDictionary.TransformedToken[];

  it('transforms names to dot notation', () => {
    expect(items.map(item => namePathToCamelCase.transformer(item, {}))).toStrictEqual([
      "baseColorRed",
      "baseRed",
    ]);
  });

  it('adds prefix', () => {
    expect(items.map(item => namePathToCamelCase.transformer(item, { prefix: 'PREFIX' }))).toStrictEqual([
      "PREFIXBaseColorRed",
      "PREFIXBaseRed",
    ]);
  });

})
