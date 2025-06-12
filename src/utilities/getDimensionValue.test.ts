import {TransformedToken} from 'style-dictionary/types'
import {getDimensionValue} from './getDimensionValue'

describe('Utility: getDimensionValue', () => {
  it('extracts value from simple string format', () => {
    const token = {
      value: '2rem',
      $type: 'dimension',
    } as TransformedToken

    expect(getDimensionValue(token)).toBe('2rem')
  })

  it('extracts value from $value string format', () => {
    const token = {
      $value: '20px',
      $type: 'dimension',
    } as TransformedToken

    expect(getDimensionValue(token)).toBe('20px')
  })

  it('extracts value from structured format with value property', () => {
    const token = {
      $value: {
        value: '3rem',
      },
      $type: 'dimension',
    } as TransformedToken

    expect(getDimensionValue(token)).toBe('3rem')
  })

  it('extracts value from structured format with value property (using value property)', () => {
    const token = {
      value: {
        value: '15px',
      },
      $type: 'dimension',
    } as TransformedToken

    expect(getDimensionValue(token)).toBe('15px')
  })

  it('converts non-string values to string', () => {
    const token = {
      value: 0,
      $type: 'dimension',
    } as TransformedToken

    expect(getDimensionValue(token)).toBe('0')
  })

  it('handles undefined/null gracefully', () => {
    const token = {
      value: null,
      $type: 'dimension',
    } as TransformedToken

    expect(getDimensionValue(token)).toBe('undefined')
  })
})