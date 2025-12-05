import {describe, expect, it} from 'vitest'
import {TransformedToken} from 'style-dictionary/types'
import {getValue} from './getValue'

describe('getValue', () => {
  it('should return $value when present', () => {
    const token = {
      name: 'color-primary',
      $value: '#ff0000',
      $type: 'color',
    } as TransformedToken

    const result = getValue<string>(token)
    expect(result).toBe('#ff0000')
  })
  it('should return throw on missing $value', () => {
    const token = {
      name: 'color-primary',
      $type: 'color',
    } as TransformedToken

    expect(() => getValue<string>(token)).toThrow('The token color-primary has no valid $value property.')
  })
  it('should return throw on undefined $value', () => {
    const token = {
      name: 'color-primary',
      $value: undefined,
      $type: 'color',
    } as TransformedToken

    expect(() => getValue<string>(token)).toThrow('The token color-primary has no valid $value property.')
  })

})
