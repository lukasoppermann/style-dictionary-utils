import styleDictionary from "style-dictionary";

export const cssExtended = {
  name: 'css/extended',
  transforms: [
    ...styleDictionary.transformGroup['css'],
    'color/rgbAlpha',
    'shadow/css',
    'font/css',
    'fontFamily/css',
    'fontWeight/number',
    'cubicBezier/css',
    'border/css'
  ]
}