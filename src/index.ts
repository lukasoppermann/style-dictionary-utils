import * as OrigialStyleDictionary from 'style-dictionary'
import { isBorder } from './filter/isBorder'
import { isColor } from './filter/isColor'
import { isColorOrGradient } from './filter/isColorOrGradient'
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
import { w3cTokenJsonParser } from './parser/w3c-token-json-parser'
import { borderCss } from './transformer/border-css'
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
import { cssExtended } from './transformGroups/cssExtended'
import { gradientCss } from './transformer/gradient-css'
import { clampCss } from './transformer/clamp-css'
import { colorToRgbaFloat } from './transformer/color-to-rgba-float'
import { dimensionToPixelUnitless } from './transformer/dimension-to-pixelUnitless'
import { isClamp } from './filter/isClamp'

/**
 * Parsers
 *
 */
OrigialStyleDictionary.registerParser(w3cTokenJsonParser)

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
  name: 'color/rgba',
  ...colorToRgba
})

OrigialStyleDictionary.registerTransform({
  name: 'color/rgbaFloat',
  ...colorToRgbaFloat
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
  name: 'gradient/css',
  ...gradientCss
})

OrigialStyleDictionary.registerTransform({
  name: 'clamp/css',
  ...clampCss
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
  name: 'dimension/remToPixel',
  ...dimensionRemToPixel
})

OrigialStyleDictionary.registerTransform({
  name: 'dimension/pixelUnitless',
  ...dimensionToPixelUnitless
})

OrigialStyleDictionary.registerTransform({
  name: 'border/css',
  ...borderCss
})
/**
 * Transform groups
 *
 */
OrigialStyleDictionary.registerTransformGroup(cssExtended)
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
  name: 'isClamp',
  matcher: isClamp
})

OrigialStyleDictionary.registerFilter({
  name: 'isGradient',
  matcher: isGradient
})

OrigialStyleDictionary.registerFilter({
  name: 'isColorOrGradient',
  matcher: isColorOrGradient
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
 * @documentation https://github.com/lukasoppermann/style-dictionary-utils/blob/main/README.md
 */
// export default OrigialStyleDictionary as OrigialStyleDictionary.Core

// OrigialStyleDictionary.default = OrigialStyleDictionary;
export = OrigialStyleDictionary;