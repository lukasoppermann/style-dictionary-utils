import {TransformedToken} from 'style-dictionary/types'
import {number} from './number'

describe('transform: number', () => {
  const items = [
    {
      value: '1px',
      $type: 'dimension',
    },
    {
      $value: 0,
      $type: 'number',
    },
    {
      value: 20,
      $type: 'number',
    },
    {
      value: 20.5,
      $type: 'number',
    },
    {
      value: '3',
    },
  ] as TransformedToken[]

  const invalidItems = [
    {
      value: undefined,
      $type: 'number',
    },
    {
      value: '3',
      $type: 'number',
    },
    {
      value: '',
      $type: 'color',
    },
    {
      value: '',
    },
  ] as TransformedToken[]

  it('transforms `number` tokens', () => {
    // @ts-expect-error: because of testing with invalid data
    expect(items.filter(number.filter).map(item => number.transform(item, {}, {}))).toEqual([0, 20, 20.5])
  })

  it('throws on invalid `number` tokens', () => {
    // @ts-expect-error: because of testing with invalid data
    const filtered = invalidItems.filter(number.filter)

    filtered.map(item => {
      expect(() => number.transform(item, {}, {})).toThrow()
    })
  })

  it('throw on invalid `number` with token name tokens', () => {
    expect(() =>
      number.transform(
        {
          name: 'px-value-token',
          value: '2px',
          $type: 'number',
        } as TransformedToken,
        {},
        {},
      ),
    ).toThrow("Invalid Number: 'px-value-token: 2px' is not a valid number \n")
  })
})
