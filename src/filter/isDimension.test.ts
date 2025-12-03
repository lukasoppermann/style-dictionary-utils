import {TransformedToken} from 'style-dictionary/types'
import {isDimension} from './isDimension'

describe('Filter: isDimension', () => {
  const items = [
    {
      value: '2rem',
      $type: 'dimension',
    },
    {
      value: '#234589',
      $type: 'color',
    },
    {
      value: '12px',
      type: 'dimension',
    },
    {
      value: 'a string',
    },
  ] as TransformedToken[]

  const newFormatItems = [
    {
      $value: '2rem',
      $type: 'dimension',
    },
    {
      $value: {
        value: '2rem',
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
    expect(items.filter(isDimension.filter)).toStrictEqual([items[0], items[2]])
  })

  it('filters dimension tokens with new structured format', () => {
    expect(newFormatItems.filter(isDimension.filter)).toStrictEqual([
      newFormatItems[0],
      newFormatItems[1],
      newFormatItems[3],
    ])
  })
})
