import StyleDictionary from "style-dictionary";

export const cssExtended = {
  name: 'css/extended',
  transforms: [
    ...StyleDictionary.transformGroup['css'],
    'color/rgbAlpha',
    'shadow/css',
    'font/css',
    'fontFamily/css',
    'fontWeight/number',
    'cubicBezier/css',
    'border/css'
  ]
}