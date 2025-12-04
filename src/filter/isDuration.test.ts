import {TransformedToken} from 'style-dictionary/types'
import {isDuration} from './isDuration'

describe('Filter: isDuration', () => {
  const items = [
    {
      $value: {value: 2, unit: 's'},
      $type: 'duration',
    },
    {
      value: '10ms',
      type: 'duration',
    },
    // Non-duration tokens
    {
      value: '2rem',
      $type: 'dimension',
    },
    {
      value: 'string',
    },
  ] as TransformedToken[]

  it('filters duration tokens (both old and new formats)', () => {
    expect(items.filter(isDuration.filter)).toStrictEqual([items[0]])
  })
})
