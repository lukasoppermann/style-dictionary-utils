import {TransformedToken} from 'style-dictionary/types'
import {isFontWeight} from './isFontWeight'

describe('Filter: isFontWeight', () => {
  const items = [
    {
      $value: '300',
      $type: 'fontWeight',
    },
    {
      $value: 'bold',
      $type: 'fontWeight',
    },
    {
      $value: '500',
      $type: 'dimension',
    },
    {
      value: 'semi-bold',
      type: 'fontWeight',
    },
    {
      value: 'string',
    },
  ] as TransformedToken[]
  it('filters fontWeight tokens', () => {
    expect(items.filter(isFontWeight.filter)).toStrictEqual([items[0], items[1]])
  })
})
