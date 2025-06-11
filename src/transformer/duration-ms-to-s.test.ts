import {describe, expect, it, vi} from 'vitest'
import {TransformedToken} from 'style-dictionary/types'
import {durationMsToS} from './duration-ms-to-s.js'

// Mock console.error to capture deprecation warnings
const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

describe('transformer: durationMsToS', () => {
  beforeEach(() => {
    mockConsoleError.mockClear()
  })

  describe('filter', () => {
    it('should match duration tokens with ms unit (new object format)', () => {
      const token: TransformedToken = {
        name: 'animation.fast',
        $value: {value: 300, unit: 'ms'},
        $type: 'duration',
        path: ['animation', 'fast'],
        original: {$value: {value: 300, unit: 'ms'}, $type: 'duration'},
      }
      expect(durationMsToS.filter(token)).toBe(true)
    })

    it('should match duration tokens with ms unit (old string format)', () => {
      const token: TransformedToken = {
        name: 'animation.slow',
        $value: '500ms',
        $type: 'duration',
        path: ['animation', 'slow'],
        original: {$value: '500ms', $type: 'duration'},
      }
      expect(durationMsToS.filter(token)).toBe(true)
    })

    it('should not match duration tokens with other units', () => {
      const token: TransformedToken = {
        name: 'animation.medium',
        $value: {value: 2, unit: 's'},
        $type: 'duration',
        path: ['animation', 'medium'],
        original: {$value: {value: 2, unit: 's'}, $type: 'duration'},
      }
      expect(durationMsToS.filter(token)).toBe(false)
    })

    it('should not match non-duration tokens', () => {
      const token: TransformedToken = {
        name: 'spacing.large',
        $value: '32px',
        $type: 'dimension',
        path: ['spacing', 'large'],
        original: {$value: '32px', $type: 'dimension'},
      }
      expect(durationMsToS.filter(token)).toBe(false)
    })
  })

  describe('transform', () => {
    it('should convert ms to s (new object format)', () => {
      const token: TransformedToken = {
        name: 'animation.fast',
        $value: {value: 300, unit: 'ms'},
        $type: 'duration',
        path: ['animation', 'fast'],
        original: {$value: {value: 300, unit: 'ms'}, $type: 'duration'},
      }
      expect(durationMsToS.transform(token, {})).toBe('0.3s')
      expect(mockConsoleError).not.toHaveBeenCalled()
    })

    it('should convert ms to s (old string format with deprecation warning)', () => {
      const token: TransformedToken = {
        name: 'animation.slow',
        $value: '1000ms',
        $type: 'duration',
        path: ['animation', 'slow'],
        original: {$value: '1000ms', $type: 'duration'},
      }
      expect(durationMsToS.transform(token, {})).toBe('1s')
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('DEPRECATED: Token "animation.slow" uses the old string format')
      )
    })

    it('should handle zero values', () => {
      const token: TransformedToken = {
        name: 'animation.none',
        $value: {value: 0, unit: 'ms'},
        $type: 'duration',
        path: ['animation', 'none'],
        original: {$value: {value: 0, unit: 'ms'}, $type: 'duration'},
      }
      expect(durationMsToS.transform(token, {})).toBe('0s')
    })

    it('should handle decimal values', () => {
      const token: TransformedToken = {
        name: 'animation.quick',
        $value: {value: 150, unit: 'ms'},
        $type: 'duration',
        path: ['animation', 'quick'],
        original: {$value: {value: 150, unit: 'ms'}, $type: 'duration'},
      }
      expect(durationMsToS.transform(token, {})).toBe('0.15s')
    })

    it('should throw error for invalid unit', () => {
      const token: TransformedToken = {
        name: 'animation.invalid',
        $value: {value: 2, unit: 's'},
        $type: 'duration',
        path: ['animation', 'invalid'],
        original: {$value: {value: 2, unit: 's'}, $type: 'duration'},
      }
      expect(() => durationMsToS.transform(token, {})).toThrow(
        "Invalid unit for duration/msToS: 'animation.invalid' has unit 's', expected 'ms'"
      )
    })
  })
})