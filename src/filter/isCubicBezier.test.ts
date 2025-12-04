import {TransformedToken} from 'style-dictionary/types'
import {isCubicBezier} from './isCubicBezier'

describe('Filter: isCubicBezier', () => {
  const items = [
    {
      value: '300ms',
      $type: 'cubicBezier',
    },
    {
      value: '2rem',
      $type: 'dimension',
    },
    {
      value: '10ms',
      type: 'cubicBezier',
    },
    {
      value: 'string',
    },
  ] as TransformedToken[]
  it('filters cubicBezier tokens', () => {
    expect(items.filter(isCubicBezier.filter)).toStrictEqual([items[0]])
  })
})
