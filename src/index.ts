import OrigialStyleDictionary from 'style-dictionary'
import { isBorder } from './filter/isBorder'
import { isClamp } from './filter/isClamp'
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
import { cssAdvanced } from './format/css-advanced'
import { javascriptCommonJs } from './format/javascript-commonJs'
import { javascriptEsm } from './format/javascript-esm'
import { typescriptEsmDeclarations } from './format/typescript-esm-declarations'
import { w3cTokenJsonParser } from './parser/w3c-token-json-parser'
import { cssExtended } from './transformGroups/cssExtended'
import { borderCss } from './transformer/border-css'
import { clampCss } from './transformer/clamp-css'
import { colorAlphaToHex } from './transformer/color-alpha-to-hex'
import { colorAlphaToRgba } from './transformer/color-alpha-to-rgba'
import { colorToHex } from './transformer/color-to-hex'
import { colorToRgba } from './transformer/color-to-rgba'
import { colorToRgbaFloat } from './transformer/color-to-rgba-float'
import { cubicBezierCss } from './transformer/cubic-bezier-css'
import { dimensionPixelToRem } from './transformer/dimension-pixel-to-rem'
import { dimensionRemToPixel } from './transformer/dimension-rem-to-pixel'
import { dimensionToPixelUnitless } from './transformer/dimension-to-pixelUnitless'
import { fontCss } from './transformer/font-css'
import { fontFamilyCss } from './transformer/font-family-css'
import { fontWeightToNumber } from './transformer/font-weight-to-number'
import { gradientCss } from './transformer/gradient-css'
import { namePathToDotNotation } from './transformer/name-path-to-dot-notation'
import { namePathToCamelCase } from './transformer/name-path-to-camel-case'
import { shadowCss } from './transformer/shadow-css'

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
  format: javascriptEsm
})

OrigialStyleDictionary.registerFormat({
  name: 'javascript/commonJs',
  format: javascriptCommonJs
})

OrigialStyleDictionary.registerFormat({
  name: 'typescript/esm-declarations',
  format: typescriptEsmDeclarations
})

OrigialStyleDictionary.registerFormat({
  name: 'css/advanced',
  format: cssAdvanced
})

/**
 * Transformers
 *
 */
OrigialStyleDictionary.registerTransform({
  ...colorAlphaToRgba
})

OrigialStyleDictionary.registerTransform({
  ...colorAlphaToHex
})

OrigialStyleDictionary.registerTransform({
  ...colorToHex
})

OrigialStyleDictionary.registerTransform({
  ...colorToRgba
})

OrigialStyleDictionary.registerTransform({
  ...colorToRgbaFloat
})

OrigialStyleDictionary.registerTransform({
  ...namePathToDotNotation
})

OrigialStyleDictionary.registerTransform({
  ...namePathToCamelCase
})

OrigialStyleDictionary.registerTransform({
  ...shadowCss
})

OrigialStyleDictionary.registerTransform({
  ...gradientCss
})

OrigialStyleDictionary.registerTransform({
  ...clampCss
})

OrigialStyleDictionary.registerTransform({
  ...fontCss
})

OrigialStyleDictionary.registerTransform({
  ...fontFamilyCss
})

OrigialStyleDictionary.registerTransform({
  ...fontWeightToNumber
})

OrigialStyleDictionary.registerTransform({
  ...cubicBezierCss
})

OrigialStyleDictionary.registerTransform({
  ...dimensionPixelToRem
})

OrigialStyleDictionary.registerTransform({
  ...dimensionRemToPixel
})

OrigialStyleDictionary.registerTransform({
  ...dimensionToPixelUnitless
})

OrigialStyleDictionary.registerTransform({
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
  filter: isSource
})

OrigialStyleDictionary.registerFilter({
  name: 'isColor',
  filter: isColor
})

OrigialStyleDictionary.registerFilter({
  name: 'isClamp',
  filter: isClamp
})

OrigialStyleDictionary.registerFilter({
  name: 'isGradient',
  filter: isGradient
})

OrigialStyleDictionary.registerFilter({
  name: 'isColorOrGradient',
  filter: isColorOrGradient
})

OrigialStyleDictionary.registerFilter({
  name: 'isTypography',
  filter: isTypography
})

OrigialStyleDictionary.registerFilter({
  name: 'isTypographic',
  filter: isTypographic
})

OrigialStyleDictionary.registerFilter({
  name: 'isTransition',
  filter: isTransition
})

OrigialStyleDictionary.registerFilter({
  name: 'isStrokeStyle',
  filter: isStrokeStyle
})

OrigialStyleDictionary.registerFilter({
  name: 'isShadow',
  filter: isShadow
})

OrigialStyleDictionary.registerFilter({
  name: 'isFontWeight',
  filter: isFontWeight
})

OrigialStyleDictionary.registerFilter({
  name: 'isFontFamily',
  filter: isFontFamily
})

OrigialStyleDictionary.registerFilter({
  name: 'isDuration',
  filter: isDuration
})

OrigialStyleDictionary.registerFilter({
  name: 'isDimension',
  filter: isDimension
})

OrigialStyleDictionary.registerFilter({
  name: 'isCubicBezier',
  filter: isCubicBezier
})

OrigialStyleDictionary.registerFilter({
  name: 'isBorder',
  filter: isBorder
})



/**
 * @name {@link StyleDictionary}
 * @description Returns style dictionary object with parsers, formats and transformers
 * @documentation https://github.com/lukasoppermann/style-dictionary-utils/blob/main/README.md
 */
// export default OrigialStyleDictionary as OrigialStyleDictionary.Core

// OrigialStyleDictionary.default = OrigialStyleDictionary;
export const StyleDictionary = OrigialStyleDictionary;