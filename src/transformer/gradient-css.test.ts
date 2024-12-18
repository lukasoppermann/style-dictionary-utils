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
          color: '#ffff00',
          position: 0.666,
        },
        {
          color: '#ff0000',
          position: 1,
        },
      ],
      $type: 'gradient',
    },
    {
      $value: [
        {
          color: '#ff2200',
          position: 0,
        },
        {
          color: '#ffff44',
          position: 0.666,
        },
        {
          color: '#ff0066',
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
      '#ffff00 66%, #ff0000 100%',
      '#ff2200, #ffff44 66%, #ff0066 100%',
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
      '45deg, #ffff00 66%, #ff0000 100%',
    ])
  })

  it('transforms `gradient` tokens with added colors', () => {
    const gradient = [
      {
        value: [
          {
            color: '#020024',
            position: 0,
          },
          {
            color: '#090979',
            position: 0.35,
          },
          {
            color: '#00d4ff',
            position: 1,
          },
        ],
        $type: 'gradient',
      },
      {
        value: '',
      },
    ] as TransformedToken[]

    expect(gradient.filter(gradientCss.filter).map(item => gradientCss.transform(item, {}, {}))).toStrictEqual([
      '#020024, #090979 35%, #00d4ff 100%',
    ])
  })
})
