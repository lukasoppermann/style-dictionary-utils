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

  it('extracts value from old structured format with value property', () => {
    const token = {
      $value: {
        value: '3rem',
      },
      $type: 'dimension',
    } as TransformedToken

    expect(getDimensionValue(token)).toBe('3rem')
  })

  it('extracts value from old structured format with value property (using value property)', () => {
    const token = {
      value: {
        value: '15px',
      },
      $type: 'dimension',
    } as TransformedToken

    expect(getDimensionValue(token)).toBe('15px')
  })

  it('extracts value from new structured format with value and unit properties', () => {
    const token = {
      $value: {
        value: 2,
        unit: 'rem',
      },
      $type: 'dimension',
    } as TransformedToken

    expect(getDimensionValue(token)).toBe('2rem')
  })

  it('extracts value from new structured format with value and unit properties (using value property)', () => {
    const token = {
      value: {
        value: 16,
        unit: 'px',
      },
      $type: 'dimension',
    } as TransformedToken

    expect(getDimensionValue(token)).toBe('16px')
  })

  it('extracts value from new structured format with floating point value', () => {
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
