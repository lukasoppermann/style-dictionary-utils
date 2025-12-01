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

  it('should handle W3C spec examples - single shadow', () => {
    const w3cSingleShadow = {
      value: {
        color: '#00000080',
        offsetX: '0.5rem',
        offsetY: '0.5rem',
        blur: '1.5rem',
        spread: '0rem',
      },
      $type: 'shadow',
    } as TransformedToken

    expect(shadowCss.transform(w3cSingleShadow, {}, {})).toStrictEqual('0.5rem 0.5rem 1.5rem 0rem #00000080')
  })

  it('should handle W3C spec examples - layered shadow', () => {
    const w3cLayeredShadow = {
      value: [
        {
          color: '#00000005',
          offsetX: '0px',
          offsetY: '24px',
          blur: '22px',
          spread: '0px',
        },
        {
          color: '#0000000a',
          offsetX: '0px',
          offsetY: '42.9px',
          blur: '44px',
          spread: '0px',
        },
        {
          color: '#0000000f',
          offsetX: '0px',
          offsetY: '64px',
          blur: '64px',
          spread: '0px',
        },
      ],
      $type: 'shadow',
    } as TransformedToken

    expect(shadowCss.transform(w3cLayeredShadow, {}, {})).toStrictEqual(
      '0px 24px 22px 0px #00000005, 0px 42.9px 44px 0px #0000000a, 0px 64px 64px 0px #0000000f',
    )
  })

  it('should handle W3C spec examples - inner shadow', () => {
    const w3cInnerShadow = {
      value: {
        color: '#00000010',
        offsetX: '2px',
        offsetY: '2px',
        blur: '4px',
        spread: '0px',
        inset: true,
      },
      $type: 'shadow',
    } as TransformedToken

    expect(shadowCss.transform(w3cInnerShadow, {}, {})).toStrictEqual('2px 2px 4px 0px #00000010 inset')
  })

  it('should handle shadow without inset property (defaults to false)', () => {
    const shadowWithoutInset = {
      value: {
        color: '#000000',
        offsetX: '1px',
        offsetY: '1px',
        blur: '2px',
        spread: '1px',
      },
      $type: 'shadow',
    } as TransformedToken

    expect(shadowCss.transform(shadowWithoutInset, {}, {})).toStrictEqual('1px 1px 2px 1px #000000')
  })

  it('should handle shadow with inset explicitly set to false', () => {
    const shadowInsetFalse = {
      value: {
        color: '#000000',
        offsetX: '1px',
        offsetY: '1px',
        blur: '2px',
        spread: '1px',
        inset: false,
      },
      $type: 'shadow',
    } as TransformedToken

    expect(shadowCss.transform(shadowInsetFalse, {}, {})).toStrictEqual('1px 1px 2px 1px #000000')
  })
})
