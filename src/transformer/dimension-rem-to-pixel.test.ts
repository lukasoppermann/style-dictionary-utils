import {TransformedToken} from 'style-dictionary/types'
import {dimensionRemToPixel} from './dimension-rem-to-pixel'

describe('transform: dimensionRemToPixel', () => {
  const items = [
    {
      value: '20px',
      $type: 'dimension',
    },
    {
      value: '3rem',
      $type: 'dimension',
    },
    {
      $value: '2rem',
      $type: 'dimension',
    },
    {
      value: '',
      $type: 'color',
    },
    {
      value: '',
    },
  ] as TransformedToken[]

  const newFormatItems = [
    {
      $value: {
        value: '20px',
      },
      $type: 'dimension',
    },
    {
      $value: {
        value: '3rem',
      },
      $type: 'dimension',
    },
    {
      $value: {
        value: '2rem',
      },
      $type: 'dimension',
    },
    {
      $value: '',
      $type: 'color',
    },
    {
      $value: '',
    },
  ] as TransformedToken[]

  it('matches `dimension` tokens with rem value', () => {
    expect(items.filter(dimensionRemToPixel.filter)).toStrictEqual([items[1], items[2]])
  })

  it('transforms `dimension` tokens', () => {
    expect(
      items.filter(dimensionRemToPixel.filter).map(item => dimensionRemToPixel.transform(item, {}, {})),
    ).toStrictEqual(['48px', '32px'])
  })

  it('transforms `dimension` tokens with custom baseFont', () => {
    const platform = {
      basePxFontSize: 10,
    }
    expect(
      items.filter(dimensionRemToPixel.filter).map(item => dimensionRemToPixel.transform(item, platform, {})),
    ).toStrictEqual(['30px', '20px'])
  })

  it('matches `dimension` tokens with rem value in new structured format', () => {
    expect(newFormatItems.filter(dimensionRemToPixel.filter)).toStrictEqual([newFormatItems[1], newFormatItems[2]])
  })

  it('transforms `dimension` tokens in new structured format', () => {
    expect(
      newFormatItems.filter(dimensionRemToPixel.filter).map(item => dimensionRemToPixel.transform(item, {}, {})),
    ).toStrictEqual(['48px', '32px'])
  })

  it('transforms `dimension` tokens with custom baseFont in new structured format', () => {
    const platform = {
      basePxFontSize: 10,
    }
    expect(
      newFormatItems.filter(dimensionRemToPixel.filter).map(item => dimensionRemToPixel.transform(item, platform, {})),
    ).toStrictEqual(['30px', '20px'])
  })
})
