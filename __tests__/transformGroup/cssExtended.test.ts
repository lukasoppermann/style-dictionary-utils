import { cssExtended } from '../../src/transformGroups/cssExtended.js';

describe('TransformGroup: css extended', () => {
  const defaultArray = [
    "attribute/cti",
    "name/kebab",
    "time/seconds",
    "html/icon",
    "size/rem",
    "color/css"
  ];

  const extensionArray = [
    'color/rgbAlpha',
    'shadow/css',
    'font/css',
    'fontFamily/css',
    'fontWeight/number',
    'cubicBezier/css',
    'border/css'
  ]

  it('has all old transforms from `css` group', () => {
    expect(defaultArray.every(v => cssExtended.transforms.includes(v))).toBe(true);
  });

  it('has all new transforms from `css/extended` group', () => {
    expect(extensionArray.every(v => cssExtended.transforms.includes(v))).toBe(true);
  });

})