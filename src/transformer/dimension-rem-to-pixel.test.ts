import {vi, beforeEach, afterEach} from 'vitest'
import {TransformedToken} from 'style-dictionary/types'
import {dimensionRemToPixel} from './dimension-rem-to-pixel'

// Mock console.error to suppress deprecation warnings in tests
const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

beforeEach(() => {
  consoleErrorSpy.mockClear()
})

afterEach(() => {
  consoleErrorSpy.mockClear()
})

describe('transform: dimensionRemToPixel', () => {
  const items = [
    // Non-rem dimensions (should not match filter)
    {
      value: '20px',
      $type: 'dimension',
    },
    // Old string format - rem dimensions
    {
      value: '3rem',
      $type: 'dimension',
    },
    {
      $value: '2rem',
      $type: 'dimension',
    },
    // New object format - rem dimensions
    {
      $value: {value: 1.5, unit: 'rem'},
      $type: 'dimension',
    },
    {
      value: {value: 4, unit: 'rem'},
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

  it('matches `dimension` tokens with rem value (both formats)', () => {
    expect(items.filter(dimensionRemToPixel.filter)).toStrictEqual([items[1], items[2], items[3], items[4]])
  })

  it('transforms `dimension` tokens (both formats)', () => {
    expect(
      items.filter(dimensionRemToPixel.filter).map(item => dimensionRemToPixel.transform(item, {}, {})),
    ).toStrictEqual(['48px', '32px', '24px', '64px'])
  })

  it('transforms `dimension` tokens with custom baseFont (both formats)', () => {
    const platform = {
      basePxFontSize: 10,
    }
    expect(
      items.filter(dimensionRemToPixel.filter).map(item => dimensionRemToPixel.transform(item, platform, {})),
    ).toStrictEqual(['30px', '20px', '15px', '40px'])
  })

  it('logs deprecation warnings for old string format', () => {
    const oldFormatToken = {
      name: 'test.spacing',
      $type: 'dimension',
      $value: '2rem'
    } as TransformedToken

    dimensionRemToPixel.transform(oldFormatToken, {}, {})
    
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('DEPRECATED: Token "test.spacing" uses the old string format')
    )
  })

  it('does not log warnings for new object format', () => {
    const newFormatToken = {
      name: 'test.spacing',
      $type: 'dimension',
      $value: {value: 2, unit: 'rem'}
    } as TransformedToken

    dimensionRemToPixel.transform(newFormatToken, {}, {})
    
    expect(consoleErrorSpy).not.toHaveBeenCalled()
  })
})
