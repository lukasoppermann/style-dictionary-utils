import {vi, beforeEach, afterEach} from 'vitest'
import {TransformedToken} from 'style-dictionary/types'
import {dimensionToPixelUnitless} from './dimension-to-pixelUnitless'

// Mock console.error to suppress deprecation warnings in tests
const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

beforeEach(() => {
  consoleErrorSpy.mockClear()
})

afterEach(() => {
  consoleErrorSpy.mockClear()
})

describe('transform: dimensionToPixelUnitless', () => {
  const items = [
    // Old string format
    {
      value: '0px',
      $type: 'dimension',
    },
    {
      value: '0',
      $type: 'dimension',
    },
    {
      $value: '15px',
      $type: 'dimension',
    },
    {
      value: '20px',
      $type: 'dimension',
    },
    {
      value: '3rem',
      $type: 'dimension',
    },
    // New object format
    {
      $value: {value: 0, unit: 'px'},
      $type: 'dimension',
    },
    {
      $value: {value: 25, unit: 'px'},
      $type: 'dimension',
    },
    {
      $value: {value: 2, unit: 'rem'},
      $type: 'dimension',
    },
    {
      $value: {value: 1.5, unit: 'em'},
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

  it('transforms `dimension` tokens (both formats)', () => {
    expect(
      items.filter(dimensionToPixelUnitless.filter).map(item => dimensionToPixelUnitless.transform(item, {}, {})),
    ).toStrictEqual([0, 0, 15, 20, 48, 0, 25, 32, '1.5em'])
  })

  it('transforms `dimension` tokens with custom baseFont (both formats)', () => {
    const platform = {
      basePxFontSize: 10,
    }
    expect(
      items.filter(dimensionToPixelUnitless.filter).map(item => dimensionToPixelUnitless.transform(item, platform, {})),
    ).toStrictEqual([0, 0, 15, 20, 30, 0, 25, 20, '1.5em'])
  })

  it('logs deprecation warnings for old string format', () => {
    const oldFormatToken = {
      name: 'test.spacing',
      $type: 'dimension',
      $value: '16px'
    } as TransformedToken

    dimensionToPixelUnitless.transform(oldFormatToken, {}, {})
    
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

    dimensionToPixelUnitless.transform(newFormatToken, {}, {})
    
    expect(consoleErrorSpy).not.toHaveBeenCalled()
  })
})
