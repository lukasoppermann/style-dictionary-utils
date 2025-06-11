import {describe, expect, it, vi} from 'vitest'
import {TransformedToken} from 'style-dictionary/types'
import {durationSToMs} from './duration-s-to-ms.js'

// Mock console.error to capture deprecation warnings
const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

describe('transformer: durationSToMs', () => {
  beforeEach(() => {
    mockConsoleError.mockClear()
  })

  describe('filter', () => {
    it('should match duration tokens with s unit (new object format)', () => {
      const token: TransformedToken = {
        name: 'animation.medium',
        $value: {value: 2, unit: 's'},
        $type: 'duration',
        path: ['animation', 'medium'],
        original: {$value: {value: 2, unit: 's'}, $type: 'duration'},
      }
      expect(durationSToMs.filter(token)).toBe(true)
    })

    it('should match duration tokens with s unit (old string format)', () => {
      const token: TransformedToken = {
        name: 'animation.slow',
        $value: '3s',
        $type: 'duration',
        path: ['animation', 'slow'],
        original: {$value: '3s', $type: 'duration'},
      }
      expect(durationSToMs.filter(token)).toBe(true)
    })

    it('should not match duration tokens with other units', () => {
      const token: TransformedToken = {
        name: 'animation.fast',
        $value: {value: 300, unit: 'ms'},
        $type: 'duration',
        path: ['animation', 'fast'],
        original: {$value: {value: 300, unit: 'ms'}, $type: 'duration'},
      }
      expect(durationSToMs.filter(token)).toBe(false)
    })

    it('should not match non-duration tokens', () => {
      const token: TransformedToken = {
        name: 'spacing.large',
        $value: '32px',
        $type: 'dimension',
        path: ['spacing', 'large'],
        original: {$value: '32px', $type: 'dimension'},
      }
      expect(durationSToMs.filter(token)).toBe(false)
    })
  })

  describe('transform', () => {
    it('should convert s to ms (new object format)', () => {
      const token: TransformedToken = {
        name: 'animation.medium',
        $value: {value: 2, unit: 's'},
        $type: 'duration',
        path: ['animation', 'medium'],
        original: {$value: {value: 2, unit: 's'}, $type: 'duration'},
      }
      expect(durationSToMs.transform(token, {})).toBe('2000ms')
      expect(mockConsoleError).not.toHaveBeenCalled()
    })

    it('should convert s to ms (old string format with deprecation warning)', () => {
      const token: TransformedToken = {
        name: 'animation.slow',
        $value: '1s',
        $type: 'duration',
        path: ['animation', 'slow'],
        original: {$value: '1s', $type: 'duration'},
      }
      expect(durationSToMs.transform(token, {})).toBe('1000ms')
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('DEPRECATED: Token "animation.slow" uses the old string format')
      )
    })

    it('should handle zero values', () => {
      const token: TransformedToken = {
        name: 'animation.none',
        $value: {value: 0, unit: 's'},
        $type: 'duration',
        path: ['animation', 'none'],
        original: {$value: {value: 0, unit: 's'}, $type: 'duration'},
      }
      expect(durationSToMs.transform(token, {})).toBe('0ms')
    })

    it('should handle decimal values', () => {
      const token: TransformedToken = {
        name: 'animation.quick',
        $value: {value: 0.5, unit: 's'},
        $type: 'duration',
        path: ['animation', 'quick'],
        original: {$value: {value: 0.5, unit: 's'}, $type: 'duration'},
      }
      expect(durationSToMs.transform(token, {})).toBe('500ms')
    })

    it('should throw error for invalid unit', () => {
      const token: TransformedToken = {
        name: 'animation.invalid',
        $value: {value: 300, unit: 'ms'},
        $type: 'duration',
        path: ['animation', 'invalid'],
        original: {$value: {value: 300, unit: 'ms'}, $type: 'duration'},
      }
      expect(() => durationSToMs.transform(token, {})).toThrow(
        "Invalid unit for duration/sToMs: 'animation.invalid' has unit 'ms', expected 's'"
      )
    })
  })
})