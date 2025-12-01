import OrigialStyleDictionary from 'style-dictionary'
import {isBorder} from './filter/isBorder.js'
import {isClamp} from './filter/isClamp.js'
import {isColor} from './filter/isColor.js'
import {isColorOrGradient} from './filter/isColorOrGradient.js'
import {isCubicBezier} from './filter/isCubicBezier.js'
import {isDeprecated} from './filter/isDeprecated.js'
import {isDimension} from './filter/isDimension.js'
import {isDuration} from './filter/isDuration.js'
import {isFontFamily} from './filter/isFontFamily.js'
import {isFontWeight} from './filter/isFontWeight.js'
import {isGradient} from './filter/isGradient.js'
import {isShadow} from './filter/isShadow.js'
import {isSource} from './filter/isSource.js'
import {isStrokeStyle} from './filter/isStrokeStyle.js'
import {isTransition} from './filter/isTransition.js'
import {isTypographic} from './filter/isTypographic.js'
import {isTypography} from './filter/isTypography.js'
import {cssAdvanced} from './format/css-advanced.js'
import {javascriptCommonJs} from './format/javascript-commonJs.js'
import {javascriptEsm} from './format/javascript-esm.js'
import {typescriptEsmDeclarations} from './format/typescript-esm-declarations.js'
import {cssExtended} from './transformGroups/cssExtended.js'
import {borderCss} from './transformer/border-css.js'
import {clampCss} from './transformer/clamp-css.js'
import {colorAlphaToHex} from './transformer/color-alpha-to-hex.js'
import {colorAlphaToRgba} from './transformer/color-alpha-to-rgba.js'
import {colorToHex} from './transformer/color-to-hex.js'
import {colorToRgba} from './transformer/color-to-rgba.js'
import {colorToRgbaFloat} from './transformer/color-to-rgba-float.js'
import {commentDeprecated} from './transformer/comment-deprecated.js'
import {cubicBezierCss} from './transformer/cubic-bezier-css.js'
import {dimensionPixelToRem} from './transformer/dimension-pixel-to-rem.js'
import {dimensionRemToPixel} from './transformer/dimension-rem-to-pixel.js'
import {dimensionToPixelUnitless} from './transformer/dimension-to-pixelUnitless.js'
import {durationToCss} from './transformer/durationToCss.js'
import {fontCss} from './transformer/font-css.js'
import {fontFamilyCss} from './transformer/font-family-css.js'
import {fontWeightToNumber} from './transformer/font-weight-to-number.js'
import {gradientCss} from './transformer/gradient-css.js'
import {namePathToDotNotation} from './transformer/name-path-to-dot-notation.js'
import {namePathToCamelCase} from './transformer/name-path-to-camel-case.js'
import {shadowCss} from './transformer/shadow-css.js'
import {isNumber} from './filter/isNumber.js'
import {number} from './transformer/number.js'
import {colorToCss} from './transformer/color-to-css.js'
import {transitionCss} from './transformer/transition-to-css.js'
import {strokeStyleCss} from './transformer/strokeStyle-to-css.js'

/**
 * Formats
 *
 */

OrigialStyleDictionary.registerFormat({
  name: 'javascript/esm',
  format: javascriptEsm,
})

OrigialStyleDictionary.registerFormat({
  name: 'javascript/commonJs',
  format: javascriptCommonJs,
})

OrigialStyleDictionary.registerFormat({
  name: 'typescript/esm-declarations',
  format: typescriptEsmDeclarations,
})

OrigialStyleDictionary.registerFormat({
  name: 'css/advanced',
  format: cssAdvanced,
})

/**
 * Transformers
 *
 */
OrigialStyleDictionary.registerTransform({
  ...colorToCss,
})

OrigialStyleDictionary.registerTransform({
  ...colorAlphaToRgba,
})

OrigialStyleDictionary.registerTransform({
  ...colorAlphaToHex,
})

OrigialStyleDictionary.registerTransform({
  ...colorToHex,
})

OrigialStyleDictionary.registerTransform({
  ...colorToRgba,
})

OrigialStyleDictionary.registerTransform({
  ...colorToRgbaFloat,
})

OrigialStyleDictionary.registerTransform({
  ...commentDeprecated,
})

OrigialStyleDictionary.registerTransform({
  ...namePathToDotNotation,
})

OrigialStyleDictionary.registerTransform({
  ...namePathToCamelCase,
})

OrigialStyleDictionary.registerTransform({
  ...shadowCss,
})

OrigialStyleDictionary.registerTransform({
  ...transitionCss,
})

OrigialStyleDictionary.registerTransform({
  ...gradientCss,
})

OrigialStyleDictionary.registerTransform({
  ...clampCss,
})

OrigialStyleDictionary.registerTransform({
  ...fontCss,
})

OrigialStyleDictionary.registerTransform({
  ...fontFamilyCss,
})

OrigialStyleDictionary.registerTransform({
  ...fontWeightToNumber,
})

OrigialStyleDictionary.registerTransform({
  ...cubicBezierCss,
})

OrigialStyleDictionary.registerTransform({
  ...dimensionPixelToRem,
})

OrigialStyleDictionary.registerTransform({
  ...dimensionRemToPixel,
})

OrigialStyleDictionary.registerTransform({
  ...dimensionToPixelUnitless,
})

OrigialStyleDictionary.registerTransform({
  ...durationToCss,
})

OrigialStyleDictionary.registerTransform({
  ...borderCss,
})

OrigialStyleDictionary.registerTransform({
  ...number,
})

OrigialStyleDictionary.registerTransform({
  ...strokeStyleCss,
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
  filter: isSource,
})

OrigialStyleDictionary.registerFilter({
  name: 'isColor',
  filter: isColor,
})

OrigialStyleDictionary.registerFilter({
  name: 'isClamp',
  filter: isClamp,
})

OrigialStyleDictionary.registerFilter({
  name: 'isGradient',
  filter: isGradient,
})

OrigialStyleDictionary.registerFilter({
  name: 'isColorOrGradient',
  filter: isColorOrGradient,
})

OrigialStyleDictionary.registerFilter({
  name: 'isTypography',
  filter: isTypography,
})

OrigialStyleDictionary.registerFilter({
  name: 'isTypographic',
  filter: isTypographic,
})

OrigialStyleDictionary.registerFilter({
  name: 'isTransition',
  filter: isTransition,
})

OrigialStyleDictionary.registerFilter({
  name: 'isStrokeStyle',
  filter: isStrokeStyle,
})

OrigialStyleDictionary.registerFilter({
  name: 'isShadow',
  filter: isShadow,
})

OrigialStyleDictionary.registerFilter({
  name: 'isFontWeight',
  filter: isFontWeight,
})

OrigialStyleDictionary.registerFilter({
  name: 'isFontFamily',
  filter: isFontFamily,
})

OrigialStyleDictionary.registerFilter({
  name: 'isDuration',
  filter: isDuration,
})

OrigialStyleDictionary.registerFilter({
  name: 'isDeprecated',
  filter: isDeprecated,
})

OrigialStyleDictionary.registerFilter({
  name: 'isDimension',
  filter: isDimension,
})

OrigialStyleDictionary.registerFilter({
  name: 'isCubicBezier',
  filter: isCubicBezier,
})

OrigialStyleDictionary.registerFilter({
  name: 'isBorder',
  filter: isBorder,
})

OrigialStyleDictionary.registerFilter({
  name: 'isNumber',
  filter: isNumber,
})

/**
 * @name {@link StyleDictionary}
 * @description Returns style dictionary object with parsers, formats and transformers
 * @documentation https://github.com/lukasoppermann/style-dictionary-utils/blob/main/README.md
 */
// export default OrigialStyleDictionary as OrigialStyleDictionary.Core

// OrigialStyleDictionary.default = OrigialStyleDictionary;
export const StyleDictionary = OrigialStyleDictionary
