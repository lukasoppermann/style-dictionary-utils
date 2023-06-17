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
    'name/pathToDotNotation',
    'cubicBezier/css',
    'border/css'
  ]
}