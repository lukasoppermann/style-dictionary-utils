import {vi, beforeEach, afterEach} from 'vitest'
import {TransformedToken} from 'style-dictionary/types'
import {
  isDimensionDurationValueObject,
  parseDimensionDurationString,
  getDimensionDurationValue,
  getDimensionDurationUnit,
  getDimensionDurationValueAndUnit,
  formatDimensionDurationString,
  logDimensionDurationDeprecationWarning,
  DimensionDurationValue
} from './dimensionUtils'

// Mock console.error to test deprecation warnings
const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

beforeEach(() => {
  consoleErrorSpy.mockClear()
})

afterEach(() => {
  consoleErrorSpy.mockClear()
})

describe('dimensionUtils', () => {
  describe('isDimensionDurationValueObject', () => {
    it('returns true for valid object format', () => {
      const objectValue: DimensionDurationValue = {value: 2, unit: 'rem'}
      expect(isDimensionDurationValueObject(objectValue)).toBe(true)
    })

    it('returns false for string format', () => {
      expect(isDimensionDurationValueObject('2rem')).toBe(false)
    })

    it('returns false for invalid objects', () => {
      expect(isDimensionDurationValueObject({value: 2})).toBe(false)
      expect(isDimensionDurationValueObject({unit: 'rem'})).toBe(false)
      expect(isDimensionDurationValueObject({})).toBe(false)
      expect(isDimensionDurationValueObject(null)).toBe(false)
    })
  })

  describe('parseDimensionDurationString', () => {
    it('parses valid dimension strings', () => {
      expect(parseDimensionDurationString('2rem')).toEqual({value: 2, unit: 'rem'})
      expect(parseDimensionDurationString('16px')).toEqual({value: 16, unit: 'px'})
      expect(parseDimensionDurationString('1.5em')).toEqual({value: 1.5, unit: 'em'})
      expect(parseDimensionDurationString('0px')).toEqual({value: 0, unit: 'px'})
      expect(parseDimensionDurationString('-2rem')).toEqual({value: -2, unit: 'rem'})
      expect(parseDimensionDurationString('0')).toEqual({value: 0, unit: ''})
      expect(parseDimensionDurationString('1.5')).toEqual({value: 1.5, unit: ''})
    })

    it('parses valid duration strings', () => {
      expect(parseDimensionDurationString('300ms')).toEqual({value: 300, unit: 'ms'})
      expect(parseDimensionDurationString('2s')).toEqual({value: 2, unit: 's'})
      expect(parseDimensionDurationString('0.5s')).toEqual({value: 0.5, unit: 's'})
    })

    it('throws error for invalid strings', () => {
      expect(() => parseDimensionDurationString('invalid')).toThrow('Invalid dimension/duration string')
      expect(() => parseDimensionDurationString('')).toThrow('Invalid dimension/duration string')
      expect(() => parseDimensionDurationString('px')).toThrow('Invalid dimension/duration string')
    })
  })

  describe('getDimensionDurationValue', () => {
    it('returns value from object format without warning', () => {
      const token = {
        name: 'test',
        $type: 'dimension',
        $value: {value: 2, unit: 'rem'}
      } as TransformedToken

      expect(getDimensionDurationValue(token)).toBe(2)
      expect(consoleErrorSpy).not.toHaveBeenCalled()
    })

    it('returns value from string format with deprecation warning', () => {
      const token = {
        name: 'test',
        $type: 'dimension',
        $value: '2rem'
      } as TransformedToken

      expect(getDimensionDurationValue(token)).toBe(2)
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('DEPRECATED: Token "test" uses the old string format')
      )
    })

    it('works with legacy value property', () => {
      const token = {
        name: 'test',
        type: 'dimension',
        value: '16px'
      } as TransformedToken

      expect(getDimensionDurationValue(token)).toBe(16)
      expect(consoleErrorSpy).toHaveBeenCalled()
    })
  })

  describe('getDimensionDurationUnit', () => {
    it('returns unit from object format without warning', () => {
      const token = {
        name: 'test',
        $type: 'dimension',
        $value: {value: 2, unit: 'rem'}
      } as TransformedToken

      expect(getDimensionDurationUnit(token)).toBe('rem')
      expect(consoleErrorSpy).not.toHaveBeenCalled()
    })

    it('returns unit from string format with deprecation warning', () => {
      const token = {
        name: 'test',
        $type: 'dimension',
        $value: '300ms'
      } as TransformedToken

      expect(getDimensionDurationUnit(token)).toBe('ms')
      expect(consoleErrorSpy).toHaveBeenCalled()
    })
  })

  describe('getDimensionDurationValueAndUnit', () => {
    it('returns both value and unit from object format', () => {
      const token = {
        name: 'test',
        $type: 'dimension',
        $value: {value: 1.5, unit: 'em'}
      } as TransformedToken

      expect(getDimensionDurationValueAndUnit(token)).toEqual({value: 1.5, unit: 'em'})
      expect(consoleErrorSpy).not.toHaveBeenCalled()
    })

    it('returns both value and unit from string format with warning', () => {
      const token = {
        name: 'test',
        $type: 'duration',
        $value: '2s'
      } as TransformedToken

      expect(getDimensionDurationValueAndUnit(token)).toEqual({value: 2, unit: 's'})
      expect(consoleErrorSpy).toHaveBeenCalled()
    })
  })

  describe('formatDimensionDurationString', () => {
    it('formats value and unit to string', () => {
      expect(formatDimensionDurationString(2, 'rem')).toBe('2rem')
      expect(formatDimensionDurationString(16, 'px')).toBe('16px')
      expect(formatDimensionDurationString(0.5, 's')).toBe('0.5s')
      expect(formatDimensionDurationString(0, 'px')).toBe('0px')
    })
  })

  describe('logDimensionDurationDeprecationWarning', () => {
    it('logs deprecation warning with token details', () => {
      const token = {
        name: 'spacing.medium',
        $type: 'dimension',
        $value: '2rem'
      } as TransformedToken

      logDimensionDurationDeprecationWarning(token)

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'DEPRECATED: Token "spacing.medium" uses the old string format "2rem" for dimension tokens. ' +
        'Please update to the new object format: {"value": number, "unit": "string"}. ' +
        'This format will be removed in a future major release.'
      )
    })

    it('works with legacy type property', () => {
      const token = {
        name: 'animation.duration',
        type: 'duration',
        value: '300ms'
      } as TransformedToken

      logDimensionDurationDeprecationWarning(token)

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('duration tokens')
      )
    })
  })
})