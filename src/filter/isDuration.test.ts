import {TransformedToken} from 'style-dictionary/types'
import {isDuration} from './isDuration'

describe('Filter: isDuration', () => {
  const items = [
    // Old string format
    {
      value: '300ms',
      $type: 'duration',
    },
    {
      value: '10ms',
      type: 'duration',
    },
    // New object format
    {
      $value: {value: 2, unit: 's'},
      $type: 'duration',
    },
    {
      value: {value: 500, unit: 'ms'},
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
    expect(items.filter(isDuration)).toStrictEqual([items[0], items[1], items[2], items[3]])
  })
})
