import {TransformedToken} from 'style-dictionary/types'
import {isDeprecated} from './isDeprecated'

describe('Filter: isDeprecated', () => {
  const items = [
    {
      value: '$deprecated false boolean',
      $deprecated: false,
    },
    {
      value: '$deprecated string',
      $deprecated: 'Please use the border style for active buttons instead.',
    },
    {
      value: '$deprecated true boolean',
      $deprecated: true,
    },
    {
      value: 'old deprecated property - should be ignored',
      deprecated: true,
    },
    {
      value: 'old deprecated string - should be ignored',
      deprecated: 'a valid string e.g. to inform about a replacement',
    },
    {
      value: 'nothing',
    },
  ] as TransformedToken[]

  it('filters deprecated tokens according to new $deprecated spec only', () => {
    // Only $deprecated property should be supported:
    // - $deprecated: true -> deprecated
    // - $deprecated: string -> deprecated
    // - $deprecated: false -> NOT deprecated
    // - deprecated: anything -> NOT deprecated (ignored)
    expect(items.filter(isDeprecated.filter)).toStrictEqual([items[1], items[2]])
  })
})
