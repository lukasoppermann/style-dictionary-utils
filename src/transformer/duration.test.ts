import {describe, expect, it, vi} from 'vitest'
import {TransformedToken} from 'style-dictionary/types'
import {durationToCss} from './duration.js'

// Mock console.error to capture deprecation warnings
const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

describe('transformer: duration to CSS', () => {
  beforeEach(() => {
    mockConsoleError.mockClear()
  })

  describe('durationToCss', () => {
    describe('filter', () => {
      it('should match duration tokens (new object format with ms)', () => {
        const token: TransformedToken = {
          name: 'animation.fast',
          $value: {value: 300, unit: 'ms'},
          $type: 'duration',
          path: ['animation', 'fast'],
          original: {$value: {value: 300, unit: 'ms'}, $type: 'duration'},
        }
        expect(durationToCss.filter(token)).toBe(true)
      })

      it('should match duration tokens (new object format with s)', () => {
        const token: TransformedToken = {
          name: 'animation.medium',
          $value: {value: 2, unit: 's'},
          $type: 'duration',
          path: ['animation', 'medium'],
          original: {$value: {value: 2, unit: 's'}, $type: 'duration'},
        }
        expect(durationToCss.filter(token)).toBe(true)
      })

      it('should match duration tokens (old string format with ms)', () => {
        const token: TransformedToken = {
          name: 'animation.slow',
          $value: '500ms',
          $type: 'duration',
          path: ['animation', 'slow'],
          original: {$value: '500ms', $type: 'duration'},
        }
        expect(durationToCss.filter(token)).toBe(true)
      })

      it('should match duration tokens (old string format with s)', () => {
        const token: TransformedToken = {
          name: 'animation.long',
          $value: '3s',
          $type: 'duration',
          path: ['animation', 'long'],
          original: {$value: '3s', $type: 'duration'},
        }
        expect(durationToCss.filter(token)).toBe(true)
      })

      it('should not match non-duration tokens', () => {
        const token: TransformedToken = {
          name: 'spacing.large',
          $value: '32px',
          $type: 'dimension',
          path: ['spacing', 'large'],
          original: {$value: '32px', $type: 'dimension'},
        }
        expect(durationToCss.filter(token)).toBe(false)
      })
    })

    describe('transform', () => {
      it('should preserve ms unit (new object format)', () => {
        const token: TransformedToken = {
          name: 'animation.fast',
          $value: {value: 300, unit: 'ms'},
          $type: 'duration',
          path: ['animation', 'fast'],
          original: {$value: {value: 300, unit: 'ms'}, $type: 'duration'},
        }
        expect(durationToCss.transform(token, {})).toBe('300ms')
        expect(mockConsoleError).not.toHaveBeenCalled()
      })

      it('should preserve s unit (new object format)', () => {
        const token: TransformedToken = {
          name: 'animation.medium',
          $value: {value: 2, unit: 's'},
          $type: 'duration',
          path: ['animation', 'medium'],
          original: {$value: {value: 2, unit: 's'}, $type: 'duration'},
        }
        expect(durationToCss.transform(token, {})).toBe('2s')
        expect(mockConsoleError).not.toHaveBeenCalled()
      })

      it('should preserve ms unit (old string format with deprecation warning)', () => {
        const token: TransformedToken = {
          name: 'animation.slow',
          $value: '1000ms',
          $type: 'duration',
          path: ['animation', 'slow'],
          original: {$value: '1000ms', $type: 'duration'},
        }
        expect(durationToCss.transform(token, {})).toBe('1000ms')
        expect(mockConsoleError).toHaveBeenCalledWith(
          expect.stringContaining('DEPRECATED: Token "animation.slow" uses the old string format')
        )
      })

      it('should preserve s unit (old string format with deprecation warning)', () => {
        const token: TransformedToken = {
          name: 'animation.long',
          $value: '3s',
          $type: 'duration',
          path: ['animation', 'long'],
          original: {$value: '3s', $type: 'duration'},
        }
        expect(durationToCss.transform(token, {})).toBe('3s')
        expect(mockConsoleError).toHaveBeenCalledWith(
          expect.stringContaining('DEPRECATED: Token "animation.long" uses the old string format')
        )
      })

      it('should handle zero values consistently', () => {
        const tokenMs: TransformedToken = {
          name: 'animation.none',
          $value: {value: 0, unit: 'ms'},
          $type: 'duration',
          path: ['animation', 'none'],
          original: {$value: {value: 0, unit: 'ms'}, $type: 'duration'},
        }
        expect(durationToCss.transform(tokenMs, {})).toBe('0s')

        const tokenS: TransformedToken = {
          name: 'animation.none2',
          $value: {value: 0, unit: 's'},
          $type: 'duration',
          path: ['animation', 'none2'],
          original: {$value: {value: 0, unit: 's'}, $type: 'duration'},
        }
        expect(durationToCss.transform(tokenS, {})).toBe('0s')
      })

      it('should handle decimal values', () => {
        const token: TransformedToken = {
          name: 'animation.quick',
          $value: {value: 0.5, unit: 's'},
          $type: 'duration',
          path: ['animation', 'quick'],
          original: {$value: {value: 0.5, unit: 's'}, $type: 'duration'},
        }
        expect(durationToCss.transform(token, {})).toBe('0.5s')
      })

      it('should throw error for invalid unit', () => {
        const token: TransformedToken = {
          name: 'animation.invalid',
          $value: {value: 2, unit: 'px'},
          $type: 'duration',
          path: ['animation', 'invalid'],
          original: {$value: {value: 2, unit: 'px'}, $type: 'duration'},
        }
        expect(() => durationToCss.transform(token, {})).toThrow(
          "Invalid unit for duration/toCss: 'animation.invalid' has unit 'px', expected 'ms' or 's'"
        )
      })
    })
  })
})