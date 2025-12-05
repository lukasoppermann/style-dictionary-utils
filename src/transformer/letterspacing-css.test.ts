import {TransformedToken} from 'style-dictionary'
import {letterspacingCss} from './letterspacing-css'

describe('transform: letterspacingCss', () => {
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
    expect(items.filter(letterspacingCss.filter)).toStrictEqual([items[1]])
  })

  it('transforms `typography` tokens', () => {
    expect(items.filter(letterspacingCss.filter).map(item => letterspacingCss.transform(item, {}, {}))).toStrictEqual([
      '0.1px',
    ])
  })
})
