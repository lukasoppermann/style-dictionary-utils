import OriginalStyleDictionary from 'style-dictionary'
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
import { typescriptEsmDeclarations } from './format/typescript-esm-declarations'
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
import { cssAdvanced } from './format/css-advanced'

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

OrigialStyleDictionary.registerFormat({
  name: 'typescript/esm-declarations',
  formatter: typescriptEsmDeclarations
})

OrigialStyleDictionary.registerFormat({
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