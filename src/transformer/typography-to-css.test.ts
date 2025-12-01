import {TransformedToken} from 'style-dictionary'
import {typographyCss} from './typography-to-css'

describe('transform: typographyCss', () => {
  const items = [
    {
      value: '',
      $type: 'color',
    },
    {
      value: {
        fontFamily: ['Arial', 'sans-serif'],
        fontSize: {value: 16, unit: 'px'},
        fontWeight: 400,
        letterSpacing: {value: 0.1, unit: 'px'},
        lineHeight: 1.5,
      },
      $type: 'typography',
    },
  ] as TransformedToken[]

  it('matches `typography` tokens', () => {
    expect(items.filter(typographyCss.filter)).toStrictEqual([items[1]])
  })

  it('transforms `typography` tokens', () => {
    expect(items.filter(typographyCss.filter).map(item => typographyCss.transform(item, {}, {}))).toStrictEqual([
      '400 16px/1.5 Arial, sans-serif',
    ])
  })

  it('transforms `typography` token with string fontWeight', () => {
    const item = {
      value: {
        fontFamily: ['Arial', 'sans-serif'],
        fontSize: {value: 16, unit: 'px'},
        fontWeight: 'bold',
        letterSpacing: {value: 0.1, unit: 'px'},
        lineHeight: 1.5,
      },
      $type: 'typography',
    } as TransformedToken

    expect(typographyCss.transform(item, {}, {})).toStrictEqual('700 16px/1.5 Arial, sans-serif')
  })
})
