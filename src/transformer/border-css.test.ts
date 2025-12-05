import {TransformedToken} from 'style-dictionary'
import {borderCss} from './border-css'

describe('transform: border', () => {
  const items = [
    {
      $value: {
        color: {
          colorSpace: 'srgb',
          components: [0.2, 0.3, 0.4],
        },
        width: {
          value: 1,
          unit: 'px',
        },
        style: 'dashed',
      },
      $type: 'border',
    },
    {
      $value: {
        color: {
          colorSpace: 'srgb',
          components: [0.2, 0.3, 0.4],
          alpha: 0.5,
        },
        width: {
          value: 0.25,
          unit: 'rem',
        },
        style: 'solid',
      },
      $type: 'border',
    },
  ]

  it('transforms `border` tokens', () => {
    expect(items.map(item => borderCss.transform(item as TransformedToken, {outputUnit: 'px'}, {}))).toStrictEqual([
      '1px dashed #334d66',
      '4px solid #334d6680',
    ])
  })
})
