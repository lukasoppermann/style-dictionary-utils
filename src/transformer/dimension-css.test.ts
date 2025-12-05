import {TransformedToken} from 'style-dictionary/types'
import {dimensionCss} from './dimension-css.js'

describe('transform: dimensionCss', () => {
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

  it('transforms `dimensionCss` tokens', () => {
    expect(items.filter(dimensionCss.filter).map(item => dimensionCss.transform(item, {}, {}))).toStrictEqual([
      '0px',
      '20px',
      '3rem',
    ])
  })

  it('transforms `dimensionCss` tokens with custom baseFont', () => {
    const platform = {
      basePxFontSize: 10,
      outputUnit: 'rem',
    }
    expect(items.filter(dimensionCss.filter).map(item => dimensionCss.transform(item, platform, {}))).toStrictEqual([
      '0rem',
      '2rem',
      '3rem',
    ])
  })

  it('transforms `dimensionCss` tokens with custom baseFont', () => {
    const platform = {
      outputUnit: 'px',
    }
    expect(items.filter(dimensionCss.filter).map(item => dimensionCss.transform(item, platform, {}))).toStrictEqual([
      '0px',
      '20px',
      '48px',
    ])
  })

  it('transforms `dimensionCss` without unit', () => {
    const platform = {
      basePxFontSize: 10,
      outputUnit: 'px',
      appendUnit: false,
    }
    expect(items.filter(dimensionCss.filter).map(item => dimensionCss.transform(item, platform, {}))).toStrictEqual([
      '0',
      '20',
      '30',
    ])
  })
})
