import {TransformedToken} from 'style-dictionary'
import {gradientCss} from './gradient-css'

describe('transform: gradientCss', () => {
  const items = [
    {
      value: '',
      $type: 'color',
    },
    {
      value: [
        {
          color: {
            colorSpace: 'srgb',
            components: [1, 0, 0.2],
          },
          position: 0.666,
        },
        {
          color: {
            colorSpace: 'srgb',
            components: [1, 0, 0.8],
          },
          position: 1,
        },
      ],
      $type: 'gradient',
    },
    {
      $value: [
        {
          color: {
            colorSpace: 'srgb',
            components: [1, 0, 0.2],
          },
          position: 0,
        },
        {
          color: {
            colorSpace: 'srgb',
            components: [1, 1, 0.27],
          },
          position: 0.666,
        },
        {
          color: {
            colorSpace: 'srgb',
            components: [1, 0, 0.4],
          },
          position: 1,
        },
      ],
      $type: 'gradient',
    },
    {
      value: '',
    },
  ] as TransformedToken[]

  it('matches `gradient` tokens', () => {
    expect(items.filter(gradientCss.filter)).toStrictEqual([items[1], items[2]])
  })

  it('transforms `gradient` tokens', () => {
    expect(items.filter(gradientCss.filter).map(item => gradientCss.transform(item, {}, {}))).toStrictEqual([
      '#f03 66%, #f0c 100%',
      '#f03, #ffff45 66%, #f06 100%',
    ])
  })

  it('transforms `gradient` tokens with angles', () => {
    const gradient = [
      {
        ...items[1],
        angle: '45deg',
      },
    ]
    expect(gradient.filter(gradientCss.filter).map(item => gradientCss.transform(item, {}, {}))).toStrictEqual([
      '45deg, #f03 66%, #f0c 100%',
    ])
  })

})
