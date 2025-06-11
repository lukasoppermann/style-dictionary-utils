import {TransformedToken} from 'style-dictionary/types'
import {isDeprecated} from './isDeprecated'

describe('Filter: isDeprecated', () => {
  const items = [
    {
      value: 'true boolean',
      deprecated: true,
    },
    {
      value: 'true string',
      deprecated: 'a valid string e.g. to inform about a replacement',
    },
    {
      value: 'false boolean',
      deprecated: false,
    },
    {
      value: 'invalid deprecated without $ according to new spec',
      deprecated: 'false',
    },
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
      value: 'nothing',
    },
  ] as TransformedToken[]

  it('filters deprecated tokens according to new $deprecated spec', () => {
    // According to new spec:
    // - deprecated: true -> deprecated
    // - deprecated: string -> deprecated (any string is deprecated with explanation)
    // - deprecated: false -> NOT deprecated
    // - $deprecated: true -> deprecated
    // - $deprecated: string -> deprecated
    // - $deprecated: false -> NOT deprecated
    expect(items.filter(isDeprecated)).toStrictEqual([items[0], items[1], items[3], items[5], items[6]])
  })
})
