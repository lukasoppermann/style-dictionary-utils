import {TransformedToken} from 'style-dictionary/types'
import {isNumber} from './isNumber'

describe('Filter: isNumber', () => {
  const items = [
    {
      value: 1.23,
      $type: 'number',
    },
    {
      value: '#234589',
      $type: 'color',
    },
    {
      value: 2,
      type: 'number',
    },
    {
      value: 'a string',
    },
  ] as TransformedToken[]

  it('filters number tokens', () => {
    expect(items.filter(isNumber.filter)).toStrictEqual([items[0], items[2]])
  })
})
