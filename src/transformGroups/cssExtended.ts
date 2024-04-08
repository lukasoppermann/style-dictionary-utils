import StyleDictionary from 'style-dictionary'

export const cssExtended = {
  name: 'css/extended',
  transforms: [
    ...StyleDictionary.hooks.transformGroups['css'],
    'color/rgbAlpha',
    'font/css',
    'fontFamily/css',
    'fontWeight/number',
    'cubicBezier/css',
    'border/css',
    'gradient/css',
    'shadow/css',
  ]
}