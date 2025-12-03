import {borderCss} from './transformer/border-css.js'
import {clampCss} from './transformer/clamp-css.js'
import {colorToCss} from './transformer/color-to-css.js'
import {commentDeprecated} from './transformer/comment-deprecated.js'
import {cssAdvanced} from './format/css-advanced.js'
import {cssExtended} from './transformGroups/css-extended.js'
import {cubicBezierCss} from './transformer/cubic-bezier-css.js'
import {dimensionPixelToRem} from './transformer/dimension-pixel-to-rem.js'
import {dimensionRemToPixel} from './transformer/dimension-rem-to-pixel.js'
import {dimensionToPixelUnitless} from './transformer/dimension-to-pixelUnitless.js'
import {durationCss} from './transformer/duration-css.js'
import {fontCss} from './transformer/font-css.js'
import {fontFamilyCss} from './transformer/font-family-css.js'
import {fontWeightToNumber} from './transformer/font-weight-to-number.js'
import {gradientCss} from './transformer/gradient-css.js'
import {isBorder} from './filter/isBorder.js'
import {isClamp} from './filter/isClamp.js'
import {isColor} from './filter/isColor.js'
import {isCubicBezier} from './filter/isCubicBezier.js'
import {isDeprecated} from './filter/isDeprecated.js'
import {isDimension} from './filter/isDimension.js'
import {isDuration} from './filter/isDuration.js'
import {isFontFamily} from './filter/isFontFamily.js'
import {isFontWeight} from './filter/isFontWeight.js'
import {isGradient} from './filter/isGradient.js'
import {isNumber} from './filter/isNumber.js'
import {isShadow} from './filter/isShadow.js'
import {isSource} from './filter/isSource.js'
import {isStrokeStyle} from './filter/isStrokeStyle.js'
import {isTransition} from './filter/isTransition.js'
import {isTypography} from './filter/isTypography.js'
import {javascriptCommonJs} from './format/javascript-commonJs.js'
import {javascriptEsm} from './format/javascript-esm.js'
import {namePathToCamelCase} from './transformer/name-path-to-camel-case.js'
import {namePathToDotNotation} from './transformer/name-path-to-dot-notation.js'
import {number} from './transformer/number.js'
import {shadowCss} from './transformer/shadow-css.js'
import {strokeStyleCss} from './transformer/strokeStyle-to-css.js'
import {transitionToCss} from './transformer/transition-to-css.js'
import {typescriptEsmDeclarations} from './format/typescript-esm-declarations.js'
import OrigialStyleDictionary from 'style-dictionary'

/**
 * Formats
 *
 */

OrigialStyleDictionary.registerFormat(cssAdvanced)
OrigialStyleDictionary.registerFormat(javascriptEsm)
OrigialStyleDictionary.registerFormat(javascriptCommonJs)
OrigialStyleDictionary.registerFormat(typescriptEsmDeclarations)

/**
 * Transformers
 *
 */
OrigialStyleDictionary.registerTransform(borderCss)
OrigialStyleDictionary.registerTransform(clampCss)
OrigialStyleDictionary.registerTransform(colorToCss)
OrigialStyleDictionary.registerTransform(commentDeprecated)
OrigialStyleDictionary.registerTransform(cubicBezierCss)
OrigialStyleDictionary.registerTransform(dimensionPixelToRem)
OrigialStyleDictionary.registerTransform(dimensionRemToPixel)
OrigialStyleDictionary.registerTransform(dimensionToPixelUnitless)
OrigialStyleDictionary.registerTransform(durationCss)
OrigialStyleDictionary.registerTransform(fontCss)
OrigialStyleDictionary.registerTransform(fontFamilyCss)
OrigialStyleDictionary.registerTransform(fontWeightToNumber)
OrigialStyleDictionary.registerTransform(gradientCss)
OrigialStyleDictionary.registerTransform(namePathToCamelCase)
OrigialStyleDictionary.registerTransform(namePathToDotNotation)
OrigialStyleDictionary.registerTransform(number)
OrigialStyleDictionary.registerTransform(shadowCss)
OrigialStyleDictionary.registerTransform(strokeStyleCss)
OrigialStyleDictionary.registerTransform(transitionToCss)
/**
 * Transform groups
 *
 */
OrigialStyleDictionary.registerTransformGroup(cssExtended)
/**
 * Filters
 *
 */
OrigialStyleDictionary.registerFilter(isBorder)
OrigialStyleDictionary.registerFilter(isClamp)
OrigialStyleDictionary.registerFilter(isColor)
OrigialStyleDictionary.registerFilter(isCubicBezier)
OrigialStyleDictionary.registerFilter(isDeprecated)
OrigialStyleDictionary.registerFilter(isDimension)
OrigialStyleDictionary.registerFilter(isDuration)
OrigialStyleDictionary.registerFilter(isFontFamily)
OrigialStyleDictionary.registerFilter(isFontWeight)
OrigialStyleDictionary.registerFilter(isGradient)
OrigialStyleDictionary.registerFilter(isNumber)
OrigialStyleDictionary.registerFilter(isShadow)
OrigialStyleDictionary.registerFilter(isSource)
OrigialStyleDictionary.registerFilter(isStrokeStyle)
OrigialStyleDictionary.registerFilter(isTransition)
OrigialStyleDictionary.registerFilter(isTypography)

/**
 * @name {@link StyleDictionary}
 * @description Returns style dictionary object with parsers, formats and transformers
 * @documentation https://github.com/lukasoppermann/style-dictionary-utils/blob/main/README.md
 */
// export default OrigialStyleDictionary as OrigialStyleDictionary.Core

// OrigialStyleDictionary.default = OrigialStyleDictionary;
export const StyleDictionary = OrigialStyleDictionary
