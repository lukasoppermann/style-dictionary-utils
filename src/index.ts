import OriginalStyleDictionary from 'style-dictionary'
import { isBorder } from './filter/isBorder.js'
import { isColor } from './filter/isColor.js'
import { isColorOrGradient } from './filter/isColorOrGradient.js'
import { isCubicBezier } from './filter/isCubicBezier.js'
import { isDimension } from './filter/isDimension.js'
import { isDuration } from './filter/isDuration.js'
import { isFontFamily } from './filter/isFontFamily.js'
import { isFontWeight } from './filter/isFontWeight.js'
import { isGradient } from './filter/isGradient.js'
import { isShadow } from './filter/isShadow.js'
import { isSource } from './filter/isSource.js'
import { isStrokeStyle } from './filter/isStrokeStyle.js'
import { isTransition } from './filter/isTransition.js'
import { isTypographic } from './filter/isTypographic.js'
import { isTypography } from './filter/isTypography.js'
import { javascriptCommonJs } from './format/javascript-commonJs.js'
import { javascriptEsm } from './format/javascript-esm.js'
import { typescriptEsmDeclarations } from './format/typescript-esm-declarations.js'
import { w3cTokenJsonParser } from './parser/w3c-token-json-parser.js'
import { borderCss } from './transformer/border-css.js'
import { colorAlphaToHex } from './transformer/color-alpha-to-hex.js'
import { colorAlphaToRgba } from './transformer/color-alpha-to-rgba.js'
import { colorToHex } from './transformer/color-to-hex.js'
import { colorToRgba } from './transformer/color-to-rgba.js'
import { cubicBezierCss } from './transformer/cubic-bezier-css.js'
import { dimensionPixelToRem } from './transformer/dimension-pixel-to-rem.js'
import { dimensionRemToPixel } from './transformer/dimension-rem-to-pixel.js'
import { fontCss } from './transformer/font-css.js'
import { fontFamilyCss } from './transformer/font-family-css.js'
import { fontWeightToNumber } from './transformer/font-weight-to-number.js'
import { namePathToDotNotation } from './transformer/name-path-to-dot-notation.js'
import { shadowCss } from './transformer/shadow-css.js'
import { cssExtended } from './transformGroups/cssExtended.js'
import { gradientCss } from './transformer/gradient-css.js'
import { clampCss } from './transformer/clamp-css.js'
import { colorToRgbaFloat } from './transformer/color-to-rgba-float.js'
import { dimensionToPixelUnitless } from './transformer/dimension-to-pixelUnitless.js'
import { isClamp } from './filter/isClamp.js'
import { cssAdvanced } from './format/css-advanced.js'

/**
 * Parsers
 *
 */
OriginalStyleDictionary.registerParser(w3cTokenJsonParser)

/**
 * Formats
 *
 */

OriginalStyleDictionary.registerFormat({
  name: 'javascript/esm',
  formatter: javascriptEsm
})

OriginalStyleDictionary.registerFormat({
  name: 'javascript/commonJs',
  formatter: javascriptCommonJs
})

OriginalStyleDictionary.registerFormat({
  name: 'typescript/esm-declarations',
  formatter: typescriptEsmDeclarations
})

OriginalStyleDictionary.registerFormat({
  name: 'css/advanced',
  formatter: cssAdvanced
})

/**
 * Transformers
 *
 */
OriginalStyleDictionary.registerTransform({
  name: 'color/rgbAlpha',
  ...colorAlphaToRgba
})

OriginalStyleDictionary.registerTransform({
  name: 'color/hexAlpha',
  ...colorAlphaToHex
})

OriginalStyleDictionary.registerTransform({
  name: 'color/hex',
  ...colorToHex
})

OriginalStyleDictionary.registerTransform({
  name: 'color/rgba',
  ...colorToRgba
})

OriginalStyleDictionary.registerTransform({
  name: 'color/rgbaFloat',
  ...colorToRgbaFloat
})

OriginalStyleDictionary.registerTransform({
  name: 'name/pathToDotNotation',
  ...namePathToDotNotation
})

OriginalStyleDictionary.registerTransform({
  name: 'shadow/css',
  ...shadowCss
})

OriginalStyleDictionary.registerTransform({
  name: 'gradient/css',
  ...gradientCss
})

OriginalStyleDictionary.registerTransform({
  name: 'clamp/css',
  ...clampCss
})

OriginalStyleDictionary.registerTransform({
  name: 'font/css',
  ...fontCss
})

OriginalStyleDictionary.registerTransform({
  name: 'fontFamily/css',
  ...fontFamilyCss
})

OriginalStyleDictionary.registerTransform({
  name: 'fontWeight/number',
  ...fontWeightToNumber
})

OriginalStyleDictionary.registerTransform({
  name: 'cubicBezier/css',
  ...cubicBezierCss
})

OriginalStyleDictionary.registerTransform({
  name: 'dimension/pixelToRem',
  ...dimensionPixelToRem
})

OriginalStyleDictionary.registerTransform({
  name: 'dimension/remToPixel',
  ...dimensionRemToPixel
})

OriginalStyleDictionary.registerTransform({
  name: 'dimension/pixelUnitless',
  ...dimensionToPixelUnitless
})

OriginalStyleDictionary.registerTransform({
  name: 'border/css',
  ...borderCss
})
/**
 * Transform groups
 *
 */
OriginalStyleDictionary.registerTransformGroup(cssExtended)
/**
 * Filters
 *
 */
OriginalStyleDictionary.registerFilter({
  name: 'isSource',
  matcher: isSource
})

OriginalStyleDictionary.registerFilter({
  name: 'isColor',
  matcher: isColor
})

OriginalStyleDictionary.registerFilter({
  name: 'isClamp',
  matcher: isClamp
})

OriginalStyleDictionary.registerFilter({
  name: 'isGradient',
  matcher: isGradient
})

OriginalStyleDictionary.registerFilter({
  name: 'isColorOrGradient',
  matcher: isColorOrGradient
})

OriginalStyleDictionary.registerFilter({
  name: 'isTypography',
  matcher: isTypography
})

OriginalStyleDictionary.registerFilter({
  name: 'isTypographic',
  matcher: isTypographic
})

OriginalStyleDictionary.registerFilter({
  name: 'isTransition',
  matcher: isTransition
})

OriginalStyleDictionary.registerFilter({
  name: 'isStrokeStyle',
  matcher: isStrokeStyle
})

OriginalStyleDictionary.registerFilter({
  name: 'isShadow',
  matcher: isShadow
})

OriginalStyleDictionary.registerFilter({
  name: 'isFontWeight',
  matcher: isFontWeight
})

OriginalStyleDictionary.registerFilter({
  name: 'isFontFamily',
  matcher: isFontFamily
})

OriginalStyleDictionary.registerFilter({
  name: 'isDuration',
  matcher: isDuration
})

OriginalStyleDictionary.registerFilter({
  name: 'isDimension',
  matcher: isDimension
})

OriginalStyleDictionary.registerFilter({
  name: 'isCubicBezier',
  matcher: isCubicBezier
})

OriginalStyleDictionary.registerFilter({
  name: 'isBorder',
  matcher: isBorder
})



/**
 * @name {@link StyleDictionary}
 * @description Returns style dictionary object with parsers, formats and transformers
 * @documentation https://github.com/lukasoppermann/style-dictionary-utils/blob/main/README.md
 */
// export default OriginalStyleDictionary as OriginalStyleDictionary.Core

// OriginalStyleDictionary.default = OriginalStyleDictionary;
export default OriginalStyleDictionary;