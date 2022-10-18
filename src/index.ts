import * as OrigialStyleDictionary from 'style-dictionary'
import { isBorder } from './filter/isBorder'
import { isColor } from './filter/isColor'
import { isCubicBezier } from './filter/isCubicBezier'
import { isDimension } from './filter/isDimension'
import { isDuration } from './filter/isDuration'
import { isFontFamily } from './filter/isFontFamily'
import { isFontWeight } from './filter/isFontWeight'
import { isGradient } from './filter/isGradient'
import { isShadow } from './filter/isShadow'
import { isSource } from './filter/isSource'
import { isStrokeStyle } from './filter/isStrokeStyle'
import { isTransition } from './filter/isTransition'
import { isTypographic } from './filter/isTypographic'
import { isTypography } from './filter/isTypography'
import { javascriptCommonJs } from './format/javascript-commonJs'
import { javascriptEsm } from './format/javascript-esm'
import { w3cTokenJson5Parser } from './parser/w3c-token-json5-parser'
import { colorAlphaToHex } from './transformer/color-alpha-to-hex'
import { colorAlphaToRgba } from './transformer/color-alpha-to-rgba'
import { colorToHex } from './transformer/color-to-hex'
import { colorToRgba } from './transformer/color-to-rgba'
import { cubicBezierCss } from './transformer/cubic-bezier-css'
import { dimensionPixelToRem } from './transformer/dimension-pixel-to-rem'
import { dimensionRemToPixel } from './transformer/dimension-rem-to-pixel'
import { fontCss } from './transformer/font-css'
import { fontFamilyCss } from './transformer/font-family-css'
import { fontWeightToNumber } from './transformer/font-weight-to-number'
import { namePathToDotNotation } from './transformer/name-path-to-dot-notation'
import { shadowCss } from './transformer/shadow-css'

/**
 * Parsers
 *
 */
OrigialStyleDictionary.registerParser(w3cTokenJson5Parser)

/**
 * Formats
 *
 */

OrigialStyleDictionary.registerFormat({
  name: 'javascript/esm',
  formatter: javascriptEsm
})

OrigialStyleDictionary.registerFormat({
  name: 'javascript/commonJs',
  formatter: javascriptCommonJs
})

/**
 * Transformers
 *
 */
OrigialStyleDictionary.registerTransform({
  name: 'color/rgbAlpha',
  ...colorAlphaToRgba
})

OrigialStyleDictionary.registerTransform({
  name: 'color/hexAlpha',
  ...colorAlphaToHex
})

OrigialStyleDictionary.registerTransform({
  name: 'color/hex',
  ...colorToHex
})

OrigialStyleDictionary.registerTransform({
  name: 'color/rgb',
  ...colorToRgba
})

OrigialStyleDictionary.registerTransform({
  name: 'name/pathToDotNotation',
  ...namePathToDotNotation
})

OrigialStyleDictionary.registerTransform({
  name: 'shadow/css',
  ...shadowCss
})

OrigialStyleDictionary.registerTransform({
  name: 'font/css',
  ...fontCss
})

OrigialStyleDictionary.registerTransform({
  name: 'fontFamily/css',
  ...fontFamilyCss
})

OrigialStyleDictionary.registerTransform({
  name: 'fontWeight/number',
  ...fontWeightToNumber
})

OrigialStyleDictionary.registerTransform({
  name: 'cubicBezier/css',
  ...cubicBezierCss
})

OrigialStyleDictionary.registerTransform({
  name: 'dimension/pixelToRem',
  ...dimensionPixelToRem
})

OrigialStyleDictionary.registerTransform({
  name: 'dimension/remToPx',
  ...dimensionRemToPixel
})
/**
 * Filters
 *
 */
OrigialStyleDictionary.registerFilter({
  name: 'isSource',
  matcher: isSource
})

OrigialStyleDictionary.registerFilter({
  name: 'isColor',
  matcher: isColor
})

OrigialStyleDictionary.registerFilter({
  name: 'isTypography',
  matcher: isTypography
})

OrigialStyleDictionary.registerFilter({
  name: 'isTypographic',
  matcher: isTypographic
})

OrigialStyleDictionary.registerFilter({
  name: 'isTransition',
  matcher: isTransition
})

OrigialStyleDictionary.registerFilter({
  name: 'isStrokeStyle',
  matcher: isStrokeStyle
})

OrigialStyleDictionary.registerFilter({
  name: 'isShadow',
  matcher: isShadow
})

OrigialStyleDictionary.registerFilter({
  name: 'isGradient',
  matcher: isGradient
})

OrigialStyleDictionary.registerFilter({
  name: 'isFontWeight',
  matcher: isFontWeight
})

OrigialStyleDictionary.registerFilter({
  name: 'isFontFamily',
  matcher: isFontFamily
})

OrigialStyleDictionary.registerFilter({
  name: 'isDuration',
  matcher: isDuration
})

OrigialStyleDictionary.registerFilter({
  name: 'isDimension',
  matcher: isDimension
})

OrigialStyleDictionary.registerFilter({
  name: 'isCubicBezier',
  matcher: isCubicBezier
})

OrigialStyleDictionary.registerFilter({
  name: 'isBorder',
  matcher: isBorder
})

/**
 * @name {@link StyleDictionary}
 * @description Returns style dictionary object with parsers, formats and transformers
 * @parsers [w3cJsonParser](./parsers/w3c-json-parser.ts)
 * @formats [scss/mixin-css-variables](./formats/scss-mixin-css-variables.ts), [javascript/esm](./formats/javascript-esm.ts), [javascript/commonJs](./formats/javascript-commonJs.ts), [typescript/export-definition](./formats/typescript-export-defition.ts)
 * @transformers [color/rgbAlpha](./transformers/color-to-rgb-alpha.ts), [color/hexAlpha](./transformers/color-to-hex-alpha.ts), [color/hex6](./transformers/color-to-hex6.ts), [json/deprecated](./transformers/json-deprecated.ts), [name/pathToDotNotation](./transformers/name-path-to-dot-notation.ts)
 */
export const StyleDictionary: OrigialStyleDictionary.Core = OrigialStyleDictionary