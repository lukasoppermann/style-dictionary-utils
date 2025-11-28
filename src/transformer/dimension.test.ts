import {TransformedToken} from 'style-dictionary/types'
import {dimension} from './dimension'

describe('transform: dimension', () => {
  const items = [
    {
      $value: {
        value: 0,
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
      value: '',
      $type: 'color',
    },
    {
      value: '',
    },
  ] as TransformedToken[]

  it('transforms `dimension` tokens', () => {
    expect(
      items.filter(dimension.filter).map(item => dimension.transform(item, {}, {})),
    ).toStrictEqual(['0', '20px', '3rem'])
  })

  it('transforms `dimension` tokens with custom baseFont', () => {
    const platform = {
      basePxFontSize: 10,
      outputUnit: 'rem',
    }
    expect(
      items.filter(dimension.filter).map(item => dimension.transform(item, platform, {})),
    ).toStrictEqual(['0', '2rem', '3rem'])
  })

    it('transforms `dimension` tokens with custom baseFont', () => {
    const platform = {
      outputUnit: 'px',
    }
    expect(
      items.filter(dimension.filter).map(item => dimension.transform(item, platform, {})),
    ).toStrictEqual(['0', '20px', '48px'])
  })

  it('transforms `dimension` without unit', () => {
    const platform = {
      basePxFontSize: 10,
      outputUnit: 'px',
      appendUnit: false,
    }
    expect(
      items.filter(dimension.filter).map(item => dimension.transform(item, platform, {})),
    ).toStrictEqual(['0', '20', '30'])
  })
  
})
