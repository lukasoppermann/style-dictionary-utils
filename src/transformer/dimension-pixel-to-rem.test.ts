import {vi, beforeEach, afterEach} from 'vitest'
import {TransformedToken} from 'style-dictionary/types'
import {dimensionPixelToRem} from './dimension-pixel-to-rem'

// Mock console.error to suppress deprecation warnings in tests
const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

beforeEach(() => {
  consoleErrorSpy.mockClear()
})

afterEach(() => {
  consoleErrorSpy.mockClear()
})

describe('transform: dimensionPixelToRem', () => {
  const items = [
    // Old string format
    {
      value: '20px',
      $type: 'dimension',
    },
    {
      $value: '30px',
      $type: 'dimension',
    },
    // New object format
    {
      $value: {value: 40, unit: 'px'},
      $type: 'dimension',
    },
    {
      value: {value: 50, unit: 'px'},
      $type: 'dimension',
    },
    // Non-pixel dimensions (should not match filter)
    {
      value: '3rem',
      $type: 'dimension',
    },
    {
      $value: {value: 2, unit: 'rem'},
      $type: 'dimension',
    },
    // Non-dimension tokens
    {
      value: '',
      $type: 'color',
    },
    {
      value: '',
    },
  ] as TransformedToken[]

  it('matches `dimension` tokens with pixel value (both formats)', () => {
    expect(items.filter(dimensionPixelToRem.filter)).toStrictEqual([items[0], items[1], items[2], items[3]])
  })

  it('transforms `dimension` tokens (both formats)', () => {
    expect(
      items.filter(dimensionPixelToRem.filter).map(item => dimensionPixelToRem.transform(item, {}, {})),
    ).toStrictEqual(['1.25rem', '1.875rem', '2.5rem', '3.125rem'])
  })

  it('transforms `dimension` tokens with custom baseFont (both formats)', () => {
    const platform = {
      basePxFontSize: 10,
    }
    expect(
      items.filter(dimensionPixelToRem.filter).map(item => dimensionPixelToRem.transform(item, platform, {})),
    ).toStrictEqual(['2rem', '3rem', '4rem', '5rem'])
  })

  it('logs deprecation warnings for old string format', () => {
    const oldFormatToken = {
      name: 'test.spacing',
      $type: 'dimension',
      $value: '16px'
    } as TransformedToken

    dimensionPixelToRem.transform(oldFormatToken, {}, {})
    
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('DEPRECATED: Token "test.spacing" uses the old string format')
    )
  })

  it('does not log warnings for new object format', () => {
    const newFormatToken = {
      name: 'test.spacing',
      $type: 'dimension',
      $value: {value: 16, unit: 'px'}
    } as TransformedToken

    dimensionPixelToRem.transform(newFormatToken, {}, {})
    
    expect(consoleErrorSpy).not.toHaveBeenCalled()
  })
})
