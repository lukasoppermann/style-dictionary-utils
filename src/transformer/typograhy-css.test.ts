import {TransformedToken} from 'style-dictionary/types'
import {typographyCss} from './typograhy-css.js'

describe('transform: fontFamily', () => {
  const items = [
    {
      $value: {
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '22px',
        fontFamily: ['Helvetica', 'Arial', 'sans-serif'],
      },
      $type: 'typography',
    },
    {
      $value: {
        fontWeight: 600,
        fontSize: '12px',
        lineHeight: '26px',
        fontFamily: 'Helvetica',
      },
      $type: 'typography',
    },
    {
      $value: {
        fontSize: '16px',
        fontFamily: 'Helvetica',
      },
      $type: 'typography',
    },
    {
      value: '',
    },
    {
      value: '',
      $type: 'color',
    },
  ] as TransformedToken[]

  it('matches `typography` tokens', () => {
    expect(items.filter(typographyCss.filter)).toStrictEqual([items[0], items[1], items[2]])
  })

  it('transforms `typography` tokens', () => {
    expect(items.filter(typographyCss.filter).map(item => typographyCss.transform(item, {}, {}))).toStrictEqual([
      'italic 500 16px/22px Helvetica',
      'italic 600 12px/26px Helvetica, Arial, sans-serif',
      '16px Helvetica',
    ])
  })
})
