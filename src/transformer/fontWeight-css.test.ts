import {TransformedToken} from 'style-dictionary/types'
import {fontWeightCss} from './fontWeight-css'

describe('transform: fontWeight', () => {
  const items = [
    {
      $value: 300,
      $type: 'fontWeight',
    },
    {
      $value: 'bold',
      $type: 'fontWeight',
    },
    {
      $value: 400,
      $type: 'fontWeight',
    },
    {
      $value: '',
    },
    {
      $value: '',
      $type: 'color',
    },
  ] as TransformedToken[]

  it('matches `fontWeight` tokens', () => {
    expect(items.filter(fontWeightCss.filter)).toStrictEqual([items[0], items[1], items[2]])
  })

  it('transforms `fontWeight` string to number', () => {
    expect(items.filter(fontWeightCss.filter).map(item => fontWeightCss.transform(item, {}, {}))).toStrictEqual([
      300, 700, 400,
    ])
  })
})
