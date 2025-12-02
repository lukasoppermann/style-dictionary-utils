import {cssExtended} from './css-extended'

describe('TransformGroup: css extended', () => {
  const defaultArray = [
    'attribute/cti',
    'name/kebab',
    'time/seconds',
    'html/icon',
    'size/rem',
    'color/css',
    'asset/url',
  ]

  const extensionArray = [
    'border/css',
    'color/rgbAlpha',
    'cubicBezier/css',
    'font/css',
    'fontFamily/css',
    'fontWeight/number',
    'gradient/css',
    'shadow/css',
  ]

  it('has all old transforms from `css` group', () => {
    expect(defaultArray.every(v => cssExtended.transforms.includes(v))).toBe(true)
  })

  it('has all new transforms from `css/extended` group', () => {
    expect(extensionArray.every(v => cssExtended.transforms.includes(v))).toBe(true)
  })
})
