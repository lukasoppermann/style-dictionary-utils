import {TransformedToken} from 'style-dictionary/types'
import {namePathToCamelCase} from './name-path-to-camel-case'

describe('transform: namePathToCamelCase', () => {
  const items = [
    {
      name: 'red',
      path: ['base', 'color', 'red'],
    },
    {
      name: 'red',
      path: ['base', 'red'],
    },
  ] as TransformedToken[]

  it('transforms names to dot notation', () => {
    expect(items.map(item => namePathToCamelCase.transform(item, {}, {}))).toStrictEqual(['baseColorRed', 'baseRed'])
  })

  it('adds prefix', () => {
    expect(items.map(item => namePathToCamelCase.transform(item, {prefix: 'PREFIX'}, {}))).toStrictEqual([
      'PREFIXBaseColorRed',
      'PREFIXBaseRed',
    ])
  })
})
