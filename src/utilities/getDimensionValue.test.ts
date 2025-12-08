import {TransformedToken} from 'style-dictionary/types'
import {getDimensionValue} from './getDimensionValue'

describe('Utility: getDimensionValue', () => {
  it('extracts rem value', () => {
    const token = {
      $value: {
        value: 2,
        unit: 'rem',
      },
      $type: 'dimension',
    } as TransformedToken

    expect(getDimensionValue(token)).toBe('2rem')
  })

  it('extracts px value', () => {
    const token = {
      $value: {
        value: 16,
        unit: 'px',
      },
      $type: 'dimension',
    } as TransformedToken

    expect(getDimensionValue(token)).toBe('16px')
  })

  it('extracts value with floating point value', () => {
    const token = {
      $value: {
        value: 1.5,
        unit: 'rem',
      },
      $type: 'dimension',
    } as TransformedToken

    expect(getDimensionValue(token)).toBe('1.5rem')
  })

  it('extracts value from new structured format with zero value', () => {
    const token = {
      $value: {
        value: 0,
        unit: 'px',
      },
      $type: 'dimension',
    } as TransformedToken

    expect(getDimensionValue(token)).toBe('0px')
  })

  it('converts non-string values to string', () => {
    const token = {
      $value: 0,
      $type: 'dimension',
    } as TransformedToken

    expect(getDimensionValue(token)).toBe('0')
  })

  it('handles undefined/null gracefully', () => {
    const token = {
      name: 'my-token',
      $value: null,
      $type: 'dimension',
    } as TransformedToken

    expect(() => getDimensionValue(token)).toThrowError('The token my-token has no valid $value property.')
  })
})
