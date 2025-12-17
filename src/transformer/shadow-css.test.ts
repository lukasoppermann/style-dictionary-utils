import {TransformedToken} from 'style-dictionary/types'
import {shadowCss} from './shadow-css'

describe('transform: shadowCss', () => {
  const items = [
    {
      value: '',
      $type: 'color',
    },
    {
      $value: {
        color: {
          colorSpace: 'srgb',
          components: [0, 0, 0],
          alpha: 0.5,
        },
        offsetX: {
          value: 2,
          unit: 'px',
        },
        offsetY: {
          value: 4,
          unit: 'px',
        },
        blur: {
          value: 2,
          unit: 'px',
        },
        spread: {
          value: 1,
          unit: 'px',
        },
      },
      $type: 'shadow',
    },
    {
      $value: [
        {
          color: {
            colorSpace: 'srgb',
            components: [0, 0, 0],
            alpha: 0.4,
          },
          offsetX: {
            value: 0,
            unit: 'px',
          },
          offsetY: {
            value: 4,
            unit: 'px',
          },
          blur: {
            value: 2,
            unit: 'px',
          },
          spread: {
            value: 1,
            unit: 'px',
          },
        },
      ],
      $type: 'shadow',
    },
    {
      value: '',
    },
  ] as TransformedToken[]

  it('matches `shadow` tokens', () => {
    expect(items.filter(shadowCss.filter)).toStrictEqual([items[1], items[2]])
  })

  it('transforms `shadow` tokens', () => {
    expect(items.filter(shadowCss.filter).map(item => shadowCss.transform(item, {}, {}))).toStrictEqual([
      '2px 4px 2px 1px #00000080',
      '0px 4px 2px 1px #0006',
    ])
  })

  it('transforms `shadow` token with inset', () => {
    const item = {
      $value: {
        color: {
          colorSpace: 'srgb',
          components: [0, 0, 0],
          alpha: 0.5,
        },
        offsetX: {
          value: 2,
          unit: 'px',
        },
        offsetY: {
          value: 4,
          unit: 'px',
        },
        blur: {
          value: 2,
          unit: 'px',
        },
        spread: {
          value: 1,
          unit: 'px',
        },
        inset: true,
      },
      $type: 'shadow',
    } as TransformedToken

    expect(shadowCss.transform(item, {}, {})).toStrictEqual('inset 2px 4px 2px 1px #00000080')
  })

  it('should handle shadow with inset explicitly set to false', () => {
    const item = {
      $value: {
        color: {
          colorSpace: 'srgb',
          components: [0, 0, 0],
          alpha: 0.5,
        },
        offsetX: {
          value: 2,
          unit: 'px',
        },
        offsetY: {
          value: 4,
          unit: 'px',
        },
        blur: {
          value: 2,
          unit: 'px',
        },
        spread: {
          value: 1,
          unit: 'px',
        },
        inset: false,
      },
      $type: 'shadow',
    } as TransformedToken

    expect(shadowCss.transform(item, {}, {})).toStrictEqual('2px 4px 2px 1px #00000080')
  })

  it('should transform an array of shadow values', () => {
    const shadows = [
      {
        $type: 'shadow',
        $value: [
          {
            color: {
              colorSpace: 'srgb',
              components: [0, 0, 0],
              alpha: 0.4,
            },
            offsetX: {
              value: 0,
              unit: 'px',
            },
            offsetY: {
              value: 4,
              unit: 'px',
            },
            blur: {
              value: 2,
              unit: 'px',
            },
            spread: {
              value: 1,
              unit: 'px',
            },
            inset: true,
          },
          {
            color: {
              colorSpace: 'srgb',
              components: [1, 1, 1],
              alpha: 0.25,
            },
            offsetX: {
              value: 0,
              unit: 'px',
            },
            offsetY: {
              value: 4,
              unit: 'px',
            },
            blur: {
              value: 8,
              unit: 'px',
            },
            spread: {
              value: 4,
              unit: 'px',
            },
          },
        ],
      },
    ] as TransformedToken[]

    expect(shadows.filter(shadowCss.filter).map(item => shadowCss.transform(item, {}, {}))).toStrictEqual([
      'inset 0px 4px 2px 1px #0006, 0px 4px 8px 4px #ffffff40',
    ])
  })
})
