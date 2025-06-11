import {TransformedToken} from 'style-dictionary/types'
import {commentDeprecated} from './comment-deprecated'

describe('transform: commentDeprecated', () => {
  const items = [
    {
      value: '$deprecated string',
      $deprecated: 'a valid string e.g. to inform about a replacement',
    },
    {
      value: '$deprecated false boolean',
      $deprecated: false,
    },
    {
      value: '$deprecated true boolean',
      $deprecated: true,
    },
    {
      value: 'old deprecated true - should be ignored',
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

  it('matches tokens with valid `$deprecated` property only', () => {
    // Only $deprecated property should be supported
    expect(items.filter(commentDeprecated.filter)).toStrictEqual([items[0], items[2]])
  })

  it('adds deprecated comment to tokens with $deprecated property only', () => {
    expect(items.filter(commentDeprecated.filter).map(item => commentDeprecated.transform(item, {}, {}))).toStrictEqual(
      [
        {
          $description: 'DEPRECATED: a valid string e.g. to inform about a replacement',
          $deprecated: 'a valid string e.g. to inform about a replacement',
          value: '$deprecated string',
        },
        {
          $description: 'DEPRECATED',
          $deprecated: true,
          value: '$deprecated true boolean',
        },
      ],
    )
  })
})
