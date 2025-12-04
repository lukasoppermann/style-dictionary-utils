import {describe, it, expect} from 'vitest'
import {strokeStyleCss} from './strokeStyle-css.js'
import {TransformedToken} from 'style-dictionary'

describe('strokeStyleCss', () => {
  const items = [
    {
      value: '',
      $type: 'color',
    },
    {
      value: 'solid',
      $type: 'strokeStyle',
    },
    {
      $value: 'dashed',
      $type: 'strokeStyle',
    },
    {
      value: '',
    },
  ] as TransformedToken[]

  it('matches `strokeStyleCss` tokens', () => {
    expect(items.filter(strokeStyleCss.filter)).toStrictEqual([items[1], items[2]])
  })

  it('should return solid stroke style', () => {
    const result = strokeStyleCss.transform({value: 'solid'}, {}, {})
    expect(result).toBe('solid')
  })

  it('should return dashed stroke style', () => {
    const result = strokeStyleCss.transform({value: 'dashed'}, {}, {})
    expect(result).toBe('dashed')
  })

  it('should return dotted stroke style', () => {
    const result = strokeStyleCss.transform({value: 'dotted'}, {}, {})
    expect(result).toBe('dotted')
  })

  it('should throw on invalid input', () => {
    expect(() => strokeStyleCss.transform({value: 'invalid'}, {}, {})).toThrow(
      'Invalid value for strokeStyle: invalid. Only the following values are supported: solid, dashed, dotted, double, groove, ridge, outset, inset.',
    )
  })

  it('should throw on missing value property', () => {
    expect(() => strokeStyleCss.transform({value: ''}, {}, {})).toThrow(
      'Invalid value for strokeStyle. Only the following values are supported: solid, dashed, dotted, double, groove, ridge, outset, inset',
    )
  })
})
