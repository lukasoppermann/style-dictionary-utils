import styleDictionary from 'style-dictionary'

export const cssExtended = {
  name: 'css/extended',
  transforms: [
    ...styleDictionary.hooks.transformGroups['css'],
    'border/css',
    'color/rgbAlpha',
    'cubicBezier/css',
    'font/css',
    'fontFamily/css',
    'fontWeight/number',
    'gradient/css',
    'shadow/css',
  ],
}
