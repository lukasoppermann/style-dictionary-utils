import {TransformedToken} from 'style-dictionary/types'
import {isFontFamily} from './isFontFamily'

describe('Filter: isFontFamily', () => {
  const items = [
    {
      $value: ['Arial', 'sans-serif'],
      $type: 'fontFamily',
    },
    {
      $value: 'Arial',
      $type: 'fontFamily',
    },
    {
      value: '2rem',
      $type: 'dimension',
    },
    {
      value: '10ms',
      type: 'fontFamily',
    },
    {
      value: 'string',
    },
  ] as TransformedToken[]
  it('filters fontFamily tokens', () => {
    expect(items.filter(isFontFamily.filter)).toStrictEqual([items[0], items[1]])
  })
})
