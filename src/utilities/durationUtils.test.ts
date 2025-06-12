import {describe, expect, it, vi} from 'vitest'
import {TransformedToken} from 'style-dictionary/types'
import {
  DurationValue,
  isDurationValueObject,
  parseDurationString,
  getDurationValue,
  getDurationUnit,
  getDurationValueAndUnit,
  logDurationDeprecationWarning,
} from './durationUtils'

// Mock console.error to capture deprecation warnings
const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

describe('durationUtils', () => {
  beforeEach(() => {
    mockConsoleError.mockClear()
  })

  describe('isDurationValueObject', () => {
    it('should return true for valid duration object', () => {
      const value: DurationValue = {value: 300, unit: 'ms'}
      expect(isDurationValueObject(value)).toBe(true)
    })

    it('should return false for string value', () => {
      expect(isDurationValueObject('300ms')).toBe(false)
    })

    it('should return false for null', () => {
      expect(isDurationValueObject(null as unknown as string)).toBe(false)
    })

    it('should return false for object without required properties', () => {
      expect(isDurationValueObject({val: 300, unit: 'ms'} as unknown as DurationValue)).toBe(false)
      expect(isDurationValueObject({value: 300} as unknown as DurationValue)).toBe(false)
    })
  })

  describe('parseDurationString', () => {
    it('should parse duration with unit', () => {
      expect(parseDurationString('300ms')).toEqual({value: 300, unit: 'ms'})
      expect(parseDurationString('2s')).toEqual({value: 2, unit: 's'})
      expect(parseDurationString('1.5s')).toEqual({value: 1.5, unit: 's'})
    })

    it('should parse unitless values', () => {
      expect(parseDurationString('0')).toEqual({value: 0, unit: ''})
      expect(parseDurationString('1.5')).toEqual({value: 1.5, unit: ''})
    })

    it('should handle negative values', () => {
      expect(parseDurationString('-300ms')).toEqual({value: -300, unit: 'ms'})
    })

    it('should throw error for invalid format', () => {
      expect(() => parseDurationString('invalid')).toThrow('Invalid duration string')
      expect(() => parseDurationString('ms300')).toThrow('Invalid duration string')
    })

    it('should throw error for invalid numeric value', () => {
      expect(() => parseDurationString('abcms')).toThrow('Invalid duration string')
    })
  })

  describe('getDurationValue', () => {
    it('should return value from object format', () => {
      const token: TransformedToken = {
        name: 'animation.fast',
        $value: {value: 150, unit: 'ms'},
        $type: 'duration',
        path: ['animation', 'fast'],
        original: {$value: {value: 150, unit: 'ms'}, $type: 'duration'},
      }
      expect(getDurationValue(token)).toBe(150)
      expect(mockConsoleError).not.toHaveBeenCalled()
    })

    it('should return value from string format with deprecation warning', () => {
      const token: TransformedToken = {
        name: 'animation.slow',
        $value: '500ms',
        $type: 'duration',
        path: ['animation', 'slow'],
        original: {$value: '500ms', $type: 'duration'},
      }
      expect(getDurationValue(token)).toBe(500)
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('DEPRECATED: Token "animation.slow" uses the old string format')
      )
    })

    it('should handle legacy value property', () => {
      const token: TransformedToken = {
        name: 'animation.medium',
        value: '250ms',
        type: 'duration',
        path: ['animation', 'medium'],
        original: {value: '250ms', type: 'duration'},
      }
      expect(getDurationValue(token)).toBe(250)
    })
  })

  describe('getDurationUnit', () => {
    it('should return unit from object format', () => {
      const token: TransformedToken = {
        name: 'animation.fast',
        $value: {value: 150, unit: 'ms'},
        $type: 'duration',
        path: ['animation', 'fast'],
        original: {$value: {value: 150, unit: 'ms'}, $type: 'duration'},
      }
      expect(getDurationUnit(token)).toBe('ms')
      expect(mockConsoleError).not.toHaveBeenCalled()
    })

    it('should return unit from string format with deprecation warning', () => {
      const token: TransformedToken = {
        name: 'animation.slow',
        $value: '2s',
        $type: 'duration',
        path: ['animation', 'slow'],
        original: {$value: '2s', $type: 'duration'},
      }
      expect(getDurationUnit(token)).toBe('s')
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('DEPRECATED: Token "animation.slow" uses the old string format')
      )
    })

    it('should handle unitless values', () => {
      const token: TransformedToken = {
        name: 'animation.none',
        $value: '0',
        $type: 'duration',
        path: ['animation', 'none'],
        original: {$value: '0', $type: 'duration'},
      }
      expect(getDurationUnit(token)).toBe('')
    })
  })

  describe('getDurationValueAndUnit', () => {
    it('should return complete object from object format', () => {
      const token: TransformedToken = {
        name: 'animation.fast',
        $value: {value: 150, unit: 'ms'},
        $type: 'duration',
        path: ['animation', 'fast'],
        original: {$value: {value: 150, unit: 'ms'}, $type: 'duration'},
      }
      expect(getDurationValueAndUnit(token)).toEqual({value: 150, unit: 'ms'})
      expect(mockConsoleError).not.toHaveBeenCalled()
    })

    it('should return parsed object from string format with deprecation warning', () => {
      const token: TransformedToken = {
        name: 'animation.slow',
        $value: '500ms',
        $type: 'duration',
        path: ['animation', 'slow'],
        original: {$value: '500ms', $type: 'duration'},
      }
      expect(getDurationValueAndUnit(token)).toEqual({value: 500, unit: 'ms'})
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('DEPRECATED: Token "animation.slow" uses the old string format')
      )
    })
  })

  describe('logDurationDeprecationWarning', () => {
    it('should log deprecation warning for string value', () => {
      const token: TransformedToken = {
        name: 'animation.test',
        $value: '300ms',
        $type: 'duration',
        path: ['animation', 'test'],
        original: {$value: '300ms', $type: 'duration'},
      }
      
      logDurationDeprecationWarning(token)
      
      expect(mockConsoleError).toHaveBeenCalledWith(
        'DEPRECATED: Token "animation.test" uses the old string format "300ms" for duration tokens. ' +
        'Please update to the new object format: {"value": number, "unit": "string"}. ' +
        'This format will be removed in a future major release.'
      )
    })

    it('should use type property if $type is not available', () => {
      const token: TransformedToken = {
        name: 'animation.test',
        value: '300ms',
        type: 'duration',
        path: ['animation', 'test'],
        original: {value: '300ms', type: 'duration'},
      }
      
      logDurationDeprecationWarning(token)
      
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('for duration tokens')
      )
    })
  })
})