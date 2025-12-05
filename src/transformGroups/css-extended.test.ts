import {cssExtended} from './css-extended'

describe('TransformGroup: css extended', () => {
  const extensionArray = [
    'w3c-border/css',
    'w3c-color/css',
    'cubicBezier/css',
    'dimension/css',
    'duration/css',
    'typography/css',
    'fontFamily/css',
    'fontWeight/css',
    'gradient/css',
    'name/kebab',
    'shadow/css',
    'strokeStyle/css',
    'transition/css',
  ]

  it('has all transforms from `css` group', () => {
    expect(extensionArray).toEqual(cssExtended.transforms)
  })
})
