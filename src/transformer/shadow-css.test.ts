import {TransformedToken} from 'style-dictionary/types'
import {shadowCss} from './shadow-css'

describe('transform: shadowCss', () => {
  const items = [
    {
      value: '',
      $type: 'color',
    },
    {
      value: {
        color: '#00000066',
        offsetX: '0px',
        offsetY: '0px',
        blur: '0px',
        spread: '3px',
      },
      $type: 'shadow',
    },
    {
      $value: {
        color: '#00000077',
        offsetX: '2px',
        offsetY: '4px',
        blur: '2px',
        spread: '1px',
      },
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
      '0px 0px 0px 3px #00000066',
      '2px 4px 2px 1px #00000077',
    ])
  })

  it('should forward `shadow` string', () => {
    // @ts-expect-error: missing properties
    const stringItem = {
      value: '0px 0px 0px 2px #00000022',
      $type: 'shadow',
    } as TransformedToken

    expect(shadowCss.transform(stringItem, {}, {})).toStrictEqual('0px 0px 0px 2px #00000022')
  })

  it('should transform an array of shadow values', () => {
    const shadows = [
      {
        value: '',
        $type: 'color',
      },
      {
        value: [
          {
            color: '#00000066',
            offsetX: '0px',
            offsetY: '0px',
            blur: '0px',
            spread: '3px',
            inset: true,
          },
          {
            color: '#ffffff',
            offsetX: '2px',
            offsetY: '2px',
            blur: '4px',
            spread: '0px',
          },
        ],
        $type: 'shadow',
      },
      {
        value: '',
      },
    ] as TransformedToken[]

    expect(shadows.filter(shadowCss.filter).map(item => shadowCss.transform(item, {}, {}))).toStrictEqual([
      '0px 0px 0px 3px #00000066 inset, 2px 2px 4px 0px #ffffff',
    ])
  })
})
