import {TransformedToken} from 'style-dictionary/types'
import {colorToCss} from './color-to-css'

describe('transform: colorToCss', () => {
  it('transforms `color` tokens to hex value', () => {
    expect(
      [
        {
          $value: {
            colorSpace: 'srgb',
            components: [1, 0, 0.2],
          },
        },
        {
          $value: {
            colorSpace: 'srgb',
            components: [1, 0, 0.2],
            alpha: 0.8,
          },
        },
      ].map(item => colorToCss.transform(item as TransformedToken, {}, {})),
    ).toStrictEqual(['#f03', '#f03c'])
  })

  it('transforms `color` tokens to rgba value', () => {
    expect(
      [
        {
          $value: {
            colorSpace: 'srgb',
            components: [1, 0, 0.2],
          },
        },
        {
          $value: {
            colorSpace: 'srgb',
            components: [0.2, 0.7, 0.4],
            alpha: 0.8,
          },
        },
      ].map(item => colorToCss.transform(item as TransformedToken, {colorOutputFormat: 'rgb'}, {})),
    ).toStrictEqual(['rgba(255, 0, 51, 1)', 'rgba(51, 179, 102, 0.8)'])
  })

  it('transforms `color` tokens to hsl value', () => {
    expect(
      [
        {
          $value: {
            colorSpace: 'srgb',
            components: [1, 0, 0.2],
          },
        },
        {
          $value: {
            colorSpace: 'srgb',
            components: [0.2, 0.7, 0.4],
            alpha: 0.8,
          },
        },
      ].map(item => colorToCss.transform(item as TransformedToken, {colorOutputFormat: 'hsl'}, {})),
    ).toStrictEqual(['hsl(348deg 100% 50% / 1)', 'hsl(144deg 56% 45% / 0.8)'])
  })

  it('transforms `color` tokens to rgbFloat value', () => {
    const input = [
      {
        value: {
          colorSpace: 'srgb',
          components: [0.06666666666666667, 0.13333333333333333, 0.2],
          alpha: 1,
        },
      },
      {
        value: {
          colorSpace: 'hsl',
          components: [330, 100, 50],
          alpha: 0.5,
        },
      },
    ]
    const expectedOutput = [
      {
        r: 0.067,
        g: 0.133,
        b: 0.2,
        a: 1,
      },
      {
        r: 1,
        g: 0,
        b: 0.5,
        a: 0.5,
      },
    ]
    expect(
      input.map(item => colorToCss.transform(item as TransformedToken, {colorOutputFormat: 'rgbFloat'}, {})),
    ).toStrictEqual(expectedOutput)
  })

  it('transforms srgb `color` tokens', () => {
    expect(
      [
        {
          $value: {
            colorSpace: 'srgb',
            components: [1, 0, 0.2],
          },
        },
        {
          $value: {
            colorSpace: 'srgb',
            components: [0.2, 0.7, 0.4],
            alpha: 0.8,
          },
        },
      ].map(item => colorToCss.transform(item as TransformedToken, {})),
    ).toStrictEqual(['#f03', '#33b366cc'])
  })

  it('transforms srgb-linear `color` tokens', () => {
    expect(
      [
        {
          $value: {
            colorSpace: 'srgb-linear',
            components: [1, 0, 0.2],
          },
        },
        {
          $value: {
            colorSpace: 'srgb-linear',
            components: [0.2, 0.7, 0.4],
            alpha: 0.8,
          },
        },
      ].map(item => colorToCss.transform(item as TransformedToken, {})),
    ).toStrictEqual(['#ff007c', '#7cdaaacc'])
  })

  it('transforms hsl `color` tokens', () => {
    expect(
      [
        {
          $value: {
            colorSpace: 'hsl',
            components: [330, 100, 50],
          },
        },
        {
          $value: {
            colorSpace: 'hsl',
            components: [300, 80, 60],
            alpha: 0.8,
          },
        },
      ].map(item => colorToCss.transform(item as TransformedToken, {})),
    ).toStrictEqual(['#ff0080', '#eb47ebcc'])
  })

  it('transforms hwb `color` tokens', () => {
    expect(
      [
        {
          $value: {
            colorSpace: 'hwb',
            components: [300, 0, 0],
          },
        },
        {
          $value: {
            colorSpace: 'hwb',
            components: [300, 0, 0],
            alpha: 0.8,
          },
        },
      ].map(item => colorToCss.transform(item as TransformedToken, {})),
    ).toStrictEqual(['#f0f', '#f0fc'])
  })

  it('transforms lab `color` tokens', () => {
    expect(
      [
        {
          $value: {
            colorSpace: 'lab',
            components: [60.17, 93.54, -60.5],
          },
        },
        {
          $value: {
            colorSpace: 'lab',
            components: [60.17, 93.54, -60.5],
            alpha: 0.8,
          },
        },
      ].map(item => colorToCss.transform(item as TransformedToken, {})),
    ).toStrictEqual(['#f0f', '#f0fc'])
  })

  it('transforms lch `color` tokens', () => {
    expect(
      [
        {
          $value: {
            colorSpace: 'lch',
            components: [60.17, 111.4, 327.11],
          },
        },
        {
          $value: {
            colorSpace: 'lch',
            components: [60.17, 111.4, 327.11],
            alpha: 0.8,
          },
        },
      ].map(item => colorToCss.transform(item as TransformedToken, {})),
    ).toStrictEqual(['#f0f', '#f0fc'])
  })

  it('transforms oklab `color` tokens', () => {
    expect(
      [
        {
          $value: {
            colorSpace: 'oklab',
            components: [0.701, 0.2746, -0.169],
          },
        },
        {
          $value: {
            colorSpace: 'oklab',
            components: [0.701, 0.2746, -0.169],
            alpha: 0.8,
          },
        },
      ].map(item => colorToCss.transform(item as TransformedToken, {})),
    ).toStrictEqual(['#f0f', '#f0fc'])
  })

  it('transforms oklch `color` tokens', () => {
    expect(
      [
        {
          $value: {
            colorSpace: 'oklch',
            components: [0.7016, 0.3225, 328.363],
          },
        },
        {
          $value: {
            colorSpace: 'oklch',
            components: [0.7016, 0.3225, 328.363],
            alpha: 0.8,
          },
        },
      ].map(item => colorToCss.transform(item as TransformedToken, {})),
    ).toStrictEqual(['#f0f', '#f0fc'])
  })

  it('transforms oklch `color` tokens', () => {
    expect(
      [
        {
          $value: {
            colorSpace: 'oklch',
            components: [0.7016, 0.3225, 328.363],
          },
        },
        {
          $value: {
            colorSpace: 'oklch',
            components: [0.7016, 0.3225, 328.363],
            alpha: 0.8,
          },
        },
      ].map(item => colorToCss.transform(item as TransformedToken, {})),
    ).toStrictEqual(['#f0f', '#f0fc'])
  })

  it('transforms display-p3 `color` tokens', () => {
    expect(
      [
        {
          $value: {
            colorSpace: 'display-p3',
            components: [1, 0, 1],
          },
        },
        {
          $value: {
            colorSpace: 'display-p3',
            components: [1, 0, 1],
            alpha: 0.8,
          },
        },
      ].map(item => colorToCss.transform(item as TransformedToken, {})),
    ).toStrictEqual(['#ff2bfb', '#ff2bfbcc'])
  })

  it('transforms a98-rgb `color` tokens', () => {
    expect(
      [
        {
          $value: {
            colorSpace: 'a98-rgb',
            components: [1, 0, 1],
          },
        },
        {
          $value: {
            colorSpace: 'a98-rgb',
            components: [1, 0, 1],
            alpha: 0.8,
          },
        },
      ].map(item => colorToCss.transform(item as TransformedToken, {})),
    ).toStrictEqual(['#ff69ed', '#ff69edcc'])
  })

  it('transforms prophoto-rgb `color` tokens', () => {
    expect(
      [
        {
          $value: {
            colorSpace: 'prophoto-rgb',
            components: [1, 0, 1],
          },
        },
        {
          $value: {
            colorSpace: 'prophoto-rgb',
            components: [1, 0, 1],
            alpha: 0.8,
          },
        },
      ].map(item => colorToCss.transform(item as TransformedToken, {})),
    ).toStrictEqual(['#ff44e4', '#ff44e4cc'])
  })

  it('transforms rec2020 `color` tokens', () => {
    expect(
      [
        {
          $value: {
            colorSpace: 'rec2020',
            components: [1, 0, 1],
          },
        },
        {
          $value: {
            colorSpace: 'rec2020',
            components: [1, 0, 1],
            alpha: 0.8,
          },
        },
      ].map(item => colorToCss.transform(item as TransformedToken, {})),
    ).toStrictEqual(['#ff56e7', '#ff56e7cc'])
  })

  it('transforms xyz-d65 `color` tokens', () => {
    expect(
      [
        {
          $value: {
            colorSpace: 'xyz-d65',
            components: [0.5929, 0.2848, 0.9699],
          },
        },
        {
          $value: {
            colorSpace: 'xyz-d65',
            components: [0.5929, 0.2848, 0.9699],
            alpha: 0.8,
          },
        },
      ].map(item => colorToCss.transform(item as TransformedToken, {})),
    ).toStrictEqual(['#f0f', '#f0fc'])
  })

  it('transforms xyz-d50 `color` tokens', () => {
    expect(
      [
        {
          $value: {
            colorSpace: 'xyz-d50',
            components: [0.5791, 0.2831, 0.728],
          },
        },
        {
          $value: {
            colorSpace: 'xyz-d50',
            components: [0.5791, 0.2831, 0.728],
            alpha: 0.8,
          },
        },
      ].map(item => colorToCss.transform(item as TransformedToken, {})),
    ).toStrictEqual(['#f0f', '#f0fc'])
  })
})
