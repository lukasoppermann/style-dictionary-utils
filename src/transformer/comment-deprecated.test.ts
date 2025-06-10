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
      value: '$deprecated string',
      $deprecated: 'a valid string e.g. to inform about a replacement',
    },
    {
      value: 'false boolean',
      deprecated: false,
    },
    {
      value: 'false string - now deprecated per new spec',
      deprecated: 'false',
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
      value: 'string "true" as explanation',
      deprecated: 'true',
    },
    {
      value: 'nothing',
    },
  ] as TransformedToken[]

  it('matches tokens with valid `deprecated` property according to new spec', () => {
    // According to new spec: true boolean, any string, $deprecated true, $deprecated string are all deprecated
    expect(items.filter(commentDeprecated.filter)).toStrictEqual([items[0], items[1], items[2], items[4], items[6], items[7]])
  })

  it('adds deprecated comment to tokens according to new spec', () => {
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
        {
          $description: 'DEPRECATED: a valid string e.g. to inform about a replacement',
          $deprecated: 'a valid string e.g. to inform about a replacement',
          value: '$deprecated string',
        },
        {
          $description: 'DEPRECATED: false',
          deprecated: 'false',
          value: 'false string - now deprecated per new spec',
        },
        {
          $description: 'DEPRECATED',
          $deprecated: true,
          value: '$deprecated true boolean',
        },
        {
          $description: 'DEPRECATED: true',
          deprecated: 'true',
          value: 'string "true" as explanation',
        },
      ],
    )
  })
})
