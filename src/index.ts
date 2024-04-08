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
  format: javascriptEsm
})

OriginalStyleDictionary.registerFormat({
  name: 'javascript/commonJs',
  format: javascriptCommonJs
})

OriginalStyleDictionary.registerFormat({
  name: 'typescript/esm-declarations',
  format: typescriptEsmDeclarations
})

OriginalStyleDictionary.registerFormat({
  name: 'css/advanced',
  format: cssAdvanced
})

/**
 * Transformers
 *
 */
OriginalStyleDictionary.registerTransform({
  ...colorAlphaToRgba
})

OriginalStyleDictionary.registerTransform({
  ...colorAlphaToHex
})

OriginalStyleDictionary.registerTransform({
  ...colorToHex
})

OriginalStyleDictionary.registerTransform({
  ...colorToRgba
})

OriginalStyleDictionary.registerTransform({
  ...colorToRgbaFloat
})

OriginalStyleDictionary.registerTransform({
  ...namePathToDotNotation
})

OriginalStyleDictionary.registerTransform({
  ...shadowCss
})

OriginalStyleDictionary.registerTransform({
  ...gradientCss
})

OriginalStyleDictionary.registerTransform({
  ...clampCss
})

OriginalStyleDictionary.registerTransform({
  ...fontCss
})

OriginalStyleDictionary.registerTransform({
  ...fontFamilyCss
})

OriginalStyleDictionary.registerTransform({
  ...fontWeightToNumber
})

OriginalStyleDictionary.registerTransform({
  ...cubicBezierCss
})

OriginalStyleDictionary.registerTransform({
  ...dimensionPixelToRem
})

OriginalStyleDictionary.registerTransform({
  ...dimensionRemToPixel
})

OriginalStyleDictionary.registerTransform({
  ...dimensionToPixelUnitless
})

OriginalStyleDictionary.registerTransform({
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
  filter: isSource
})

OriginalStyleDictionary.registerFilter({
  name: 'isColor',
  filter: isColor
})

OriginalStyleDictionary.registerFilter({
  name: 'isClamp',
  filter: isClamp
})

OriginalStyleDictionary.registerFilter({
  name: 'isGradient',
  filter: isGradient
})

OriginalStyleDictionary.registerFilter({
  name: 'isColorOrGradient',
  filter: isColorOrGradient
})

OriginalStyleDictionary.registerFilter({
  name: 'isTypography',
  filter: isTypography
})

OriginalStyleDictionary.registerFilter({
  name: 'isTypographic',
  filter: isTypographic
})

OriginalStyleDictionary.registerFilter({
  name: 'isTransition',
  filter: isTransition
})

OriginalStyleDictionary.registerFilter({
  name: 'isStrokeStyle',
  filter: isStrokeStyle
})

OriginalStyleDictionary.registerFilter({
  name: 'isShadow',
  filter: isShadow
})

OriginalStyleDictionary.registerFilter({
  name: 'isFontWeight',
  filter: isFontWeight
})

OriginalStyleDictionary.registerFilter({
  name: 'isFontFamily',
  filter: isFontFamily
})

OriginalStyleDictionary.registerFilter({
  name: 'isDuration',
  filter: isDuration
})

OriginalStyleDictionary.registerFilter({
  name: 'isDimension',
  filter: isDimension
})

OriginalStyleDictionary.registerFilter({
  name: 'isCubicBezier',
  filter: isCubicBezier
})

OriginalStyleDictionary.registerFilter({
  name: 'isBorder',
  filter: isBorder
})



/**
 * @name {@link StyleDictionary}
 * @description Returns style dictionary object with parsers, formats and transformers
 * @documentation https://github.com/lukasoppermann/style-dictionary-utils/blob/main/README.md
 */
// export default OriginalStyleDictionary as OriginalStyleDictionary.Core

// OriginalStyleDictionary.default = OriginalStyleDictionary;
export default OriginalStyleDictionary;