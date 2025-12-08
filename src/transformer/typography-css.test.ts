import {TransformedToken} from 'style-dictionary/types'
import {typographyCss} from './typography-css.js'

describe('transform: fontFamily', () => {
  const items = [
    {
      $value: {
        fontWeight: 500,
        fontSize: {
          value: 16,
          unit: 'px',
        },
        lineHeight: 1.4,
        fontFamily: ['Helvetica', 'Arial', 'sans-serif'],
      },
      $type: 'typography',
    },
    {
      $value: {
        fontWeight: 600,
        fontSize: {
          value: 12,
          unit: 'px',
        },
        lineHeight: 1.2,
        fontFamily: 'Helvetica',
      },
      $type: 'typography',
    },
    {
      $value: {
        fontWeight: 500,
        fontSize: {
          value: 16,
          unit: 'px',
        },
        lineHeight: 1.3,
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
      '500 16px/1.4 Helvetica, Arial, sans-serif',
      '600 12px/1.2 Helvetica',
      '500 16px/1.3 Helvetica',
    ])
  })
})
