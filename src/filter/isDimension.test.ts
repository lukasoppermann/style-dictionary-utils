import {TransformedToken} from 'style-dictionary/types'
import {isDimension} from './isDimension'

describe('Filter: isDimension', () => {
  const items = [
    {
      $value: {
        value: 2,
        unit: 'rem',
      },
      $type: 'dimension',
    },
    {
      $value: '#234589',
      $type: 'color',
    },
    {
      $value: {
        value: '12px',
      },
      type: 'dimension',
    },
    {
      $value: 'a string',
    },
  ] as TransformedToken[]

  it('filters dimension tokens', () => {
    expect(items.filter(isDimension.filter)).toStrictEqual([items[0]])
  })
})
