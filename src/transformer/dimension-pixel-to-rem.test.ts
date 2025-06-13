import {TransformedToken} from 'style-dictionary/types'
import {dimensionPixelToRem} from './dimension-pixel-to-rem'

describe('transform: dimensionPixelToRem', () => {
  const items = [
    {
      value: '20px',
      $type: 'dimension',
    },
    {
      $value: '30px',
      $type: 'dimension',
    },
    {
      value: '3rem',
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

  const oldStructuredFormatItems = [
    {
      $value: {
        value: '20px',
      },
      $type: 'dimension',
    },
    {
      $value: {
        value: '30px',
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
      $value: '',
      $type: 'color',
    },
    {
      $value: '',
    },
  ] as TransformedToken[]

  const newStructuredFormatItems = [
    {
      $value: {
        value: 20,
        unit: 'px',
      },
      $type: 'dimension',
    },
    {
      $value: {
        value: 30,
        unit: 'px',
      },
      $type: 'dimension',
    },
    {
      $value: {
        value: 3,
        unit: 'rem',
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

  it('matches `dimension` tokens with pixel value', () => {
    expect(items.filter(dimensionPixelToRem.filter)).toStrictEqual([items[0], items[1]])
  })

  it('transforms `dimension` tokens', () => {
    expect(
      items.filter(dimensionPixelToRem.filter).map(item => dimensionPixelToRem.transform(item, {}, {})),
    ).toStrictEqual(['1.25rem', '1.875rem'])
  })

  it('transforms `dimension` tokens with custom baseFont', () => {
    const platform = {
      basePxFontSize: 10,
    }
    expect(
      items.filter(dimensionPixelToRem.filter).map(item => dimensionPixelToRem.transform(item, platform, {})),
    ).toStrictEqual(['2rem', '3rem'])
  })

  it('matches `dimension` tokens with pixel value in old structured format', () => {
    expect(oldStructuredFormatItems.filter(dimensionPixelToRem.filter)).toStrictEqual([oldStructuredFormatItems[0], oldStructuredFormatItems[1]])
  })

  it('transforms `dimension` tokens in old structured format', () => {
    expect(
      oldStructuredFormatItems.filter(dimensionPixelToRem.filter).map(item => dimensionPixelToRem.transform(item, {}, {})),
    ).toStrictEqual(['1.25rem', '1.875rem'])
  })

  it('transforms `dimension` tokens with custom baseFont in old structured format', () => {
    const platform = {
      basePxFontSize: 10,
    }
    expect(
      oldStructuredFormatItems.filter(dimensionPixelToRem.filter).map(item => dimensionPixelToRem.transform(item, platform, {})),
    ).toStrictEqual(['2rem', '3rem'])
  })

  it('matches `dimension` tokens with pixel value in new structured format', () => {
    expect(newStructuredFormatItems.filter(dimensionPixelToRem.filter)).toStrictEqual([newStructuredFormatItems[0], newStructuredFormatItems[1]])
  })

  it('transforms `dimension` tokens in new structured format', () => {
    expect(
      newStructuredFormatItems.filter(dimensionPixelToRem.filter).map(item => dimensionPixelToRem.transform(item, {}, {})),
    ).toStrictEqual(['1.25rem', '1.875rem'])
  })

  it('transforms `dimension` tokens with custom baseFont in new structured format', () => {
    const platform = {
      basePxFontSize: 10,
    }
    expect(
      newStructuredFormatItems.filter(dimensionPixelToRem.filter).map(item => dimensionPixelToRem.transform(item, platform, {})),
    ).toStrictEqual(['2rem', '3rem'])
  })
})
