import styleDictionary from 'style-dictionary'

export const cssExtended = {
  name: 'css/extended',
  transforms: [
    ...styleDictionary.hooks.transformGroups['css'],
    'border/css',
    'color/css',
    'cubicBezier/css',
    'dimension/css',
    'duration/css',
    'font/css',
    'fontFamily/css',
    'fontWeight/css',
    'gradient/css',
    'shadow/css',
  ],
}
