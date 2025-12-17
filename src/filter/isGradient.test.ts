import {TransformedToken} from 'style-dictionary/types'
import {isGradient} from './isGradient'

describe('Filter: isGradient', () => {
  const items = [
    {
      $value: '#334455',
      $type: 'gradient',
    },
    {
      value: '2rem',
      $type: 'dimension',
    },
    {
      value: '#374757',
      type: 'gradient',
    },
    {
      value: 'string',
    },
  ] as TransformedToken[]
  it('filters gradient tokens', () => {
    expect(items.filter(isGradient.filter)).toStrictEqual([items[0]])
  })
})
