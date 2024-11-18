import {TransformedToken} from 'style-dictionary/types'
import {commentDeprecated} from './comment-deprecated'

describe('transform: commentDeprecated', () => {
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

  it('matches tokens with valid `deprecated` property', () => {
    expect(items.filter(commentDeprecated.filter)).toStrictEqual([items[0], items[1]])
  })

  it('adds deprecated comment to tokens', () => {
    expect(items.filter(commentDeprecated.filter).map(item => commentDeprecated.transform(item, {}, {}))).toStrictEqual(
      [
        {
          $description: 'DEPRECATED',
          deprecated: true,
          value: 'true boolean',
        },
        {
          $description: 'DEPRECATED: a valid string e.g. to inform about a replacement',
          deprecated: 'a valid string e.g. to inform about a replacement',
          value: 'true string',
        },
      ],
    )
  })
})
