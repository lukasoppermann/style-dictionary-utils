import { TransformedToken } from 'style-dictionary/types';
import { namePathToPascalCase } from './name-path-to-pascal-case';

describe('transform: namePathToPascalCase', () => {
  const items = [{
    name: "red",
    path: ['base', 'color', 'red'],
  }, {
    name: "red",
    path: ['base', 'red'],
  }] as TransformedToken[];

  it('transforms names to pascal', () => {
    expect(items.map(item => namePathToPascalCase.transform(item, {}, {}))).toStrictEqual([
      "BaseColorRed",
      "BaseRed",
    ]);
  });

  it('removes `@`, so we can use it for the default hack', () => {
    const input = [{
      name: "red",
      path: ['base', 'color', '@', 'red'],
    }, {
      name: "red",
      path: ['base', 'red', '@'],
    }] as TransformedToken[];
    const expectedOutput = ["BaseColorRed","BaseRed"]
    expect(input.map(item => namePathToPascalCase.transform(item, {}))).toStrictEqual(expectedOutput)
  })

  it('adds prefix', () => {
    expect(items.map(item => namePathToPascalCase.transform(item, { prefix: 'PREFIX' }, {}))).toStrictEqual([
      "PREFIXBaseColorRed",
      "PREFIXBaseRed",
    ]);
  });

})
