import styleDictionary from 'style-dictionary'

export const cssExtended = {
  name: 'css/extended',
  transforms: [
    ...styleDictionary.hooks.transformGroups['css'],
    'color/rgbAlpha',
    'shadow/css',
    'font/css',
    'fontFamily/css',
    'fontWeight/number',
    'cubicBezier/css',
    'border/css',
  ],
}
