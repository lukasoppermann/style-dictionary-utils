import {TransformedToken} from 'style-dictionary/types'
import {dimensionToPixelUnitless} from './dimension-to-pixelUnitless'

describe('transform: dimensionToPixelUnitless', () => {
  const items = [
    {
      value: '0px',
      $type: 'dimension',
    },
    {
      value: '0',
      $type: 'dimension',
    },
    {
      $value: '15px',
      $type: 'dimension',
    },
    {
      value: '20px',
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
        value: '0px',
      },
      $type: 'dimension',
    },
    {
      $value: {
        value: '0',
      },
      $type: 'dimension',
    },
    {
      $value: {
        value: '15px',
      },
      $type: 'dimension',
    },
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
        value: 0,
        unit: 'px',
      },
      $type: 'dimension',
    },
    {
      $value: {
        value: 0,
        unit: 'px',
      },
      $type: 'dimension',
    },
    {
      $value: {
        value: 15,
        unit: 'px',
      },
      $type: 'dimension',
    },
    {
      $value: {
        value: 20,
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

  it('transforms `dimension` tokens', () => {
    expect(
      items.filter(dimensionToPixelUnitless.filter).map(item => dimensionToPixelUnitless.transform(item, {}, {})),
    ).toStrictEqual([0, 0, 15, 20, 48])
  })

  it('transforms `dimension` tokens with custom baseFont', () => {
    const platform = {
      basePxFontSize: 10,
    }
    expect(
      items.filter(dimensionToPixelUnitless.filter).map(item => dimensionToPixelUnitless.transform(item, platform, {})),
    ).toStrictEqual([0, 0, 15, 20, 30])
  })

  it('transforms `dimension` tokens in old structured format', () => {
    expect(
      oldStructuredFormatItems
        .filter(dimensionToPixelUnitless.filter)
        .map(item => dimensionToPixelUnitless.transform(item, {}, {})),
    ).toStrictEqual([0, 0, 15, 20, 48])
  })

  it('transforms `dimension` tokens with custom baseFont in old structured format', () => {
    const platform = {
      basePxFontSize: 10,
    }
    expect(
      oldStructuredFormatItems
        .filter(dimensionToPixelUnitless.filter)
        .map(item => dimensionToPixelUnitless.transform(item, platform, {})),
    ).toStrictEqual([0, 0, 15, 20, 30])
  })

  it('transforms `dimension` tokens in new structured format', () => {
    expect(
      newStructuredFormatItems
        .filter(dimensionToPixelUnitless.filter)
        .map(item => dimensionToPixelUnitless.transform(item, {}, {})),
    ).toStrictEqual([0, 0, 15, 20, 48])
  })

  it('transforms `dimension` tokens with custom baseFont in new structured format', () => {
    const platform = {
      basePxFontSize: 10,
    }
    expect(
      newStructuredFormatItems
        .filter(dimensionToPixelUnitless.filter)
        .map(item => dimensionToPixelUnitless.transform(item, platform, {})),
    ).toStrictEqual([0, 0, 15, 20, 30])
  })
})
