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
      value: 'false string',
      deprecated: 'false',
    },
    {
      value: 'nothing',
    },
  ] as TransformedToken[]

  it('filters deprecated tokens', () => {
    expect(items.filter(isDeprecated)).toStrictEqual([items[0], items[1]])
  })
})
