import {TransformedToken} from 'style-dictionary/types'
import {fontFamilyCss} from './fontFamily-css'

describe('transform: fontFamily', () => {
  const items = [
    {
      value: 'Helvetica',
      $type: 'fontFamily',
    },
    {
      $value: ['helvetica', 'sans-serif', 'Helvetica Neue'],
      $type: 'fontFamily',
    },
    {
      value: '',
    },
    {
      value: '',
      $type: 'color',
    },
  ] as TransformedToken[]

  it('matches `fontFamily` tokens with an array as a value', () => {
    expect(items.filter(fontFamilyCss.filter)).toStrictEqual([items[0], items[1]])
  })

  it('transforms `fontFamily` array tokens', () => {
    expect(items.filter(fontFamilyCss.filter).map(item => fontFamilyCss.transform(item, {}, {}))).toStrictEqual([
      'Helvetica',
      "helvetica, sans-serif, 'Helvetica Neue'",
    ])
  })
})
