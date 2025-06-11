import {TransformedToken} from 'style-dictionary/types'
import {isDimension} from './isDimension'

describe('Filter: isDimension', () => {
  const items = [
    // Old string format
    {
      value: '2rem',
      $type: 'dimension',
    },
    {
      value: '12px',
      type: 'dimension',
    },
    // New object format
    {
      $value: {value: 1.5, unit: 'rem'},
      $type: 'dimension',
    },
    {
      value: {value: 24, unit: 'px'},
      type: 'dimension',
    },
    // Non-dimension tokens
    {
      value: '#234589',
      $type: 'color',
    },
    {
      value: 'a string',
    },
  ] as TransformedToken[]
  
  it('filters dimension tokens (both old and new formats)', () => {
    expect(items.filter(isDimension)).toStrictEqual([items[0], items[1], items[2], items[3]])
  })
})
