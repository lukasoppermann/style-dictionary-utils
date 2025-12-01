import {Transform, TransformedToken} from 'style-dictionary/types'
import {isTransition} from '../filter/isTransition.js'
import {getValue} from '../utilities/getValue.js'
import {TokenValueCubicBezier} from './cubic-bezier-css.js'
import {TokenValueDuration} from '../utilities/durationUtils.js'
import {transformDuration} from './durationToCss.js'

type TokenValueTransition = {
  duration: TokenValueDuration
  delay: TokenValueDuration
  timingFunction: TokenValueCubicBezier
}

/**
 * transitionCss
 * @description convert a transition token to a CSS-compatible transition string
 */
export const transitionCss: Transform = {
  name: 'transition/css',
  type: `value`,
  transitive: true,
  filter: isTransition,
  transform: (token: TransformedToken) => {
    const {duration, delay, timingFunction} = getValue<TokenValueTransition>(token)
    return `${transformDuration(duration, `${token.name} duration`)} ${transformDuration(delay, `${token.name} delay`)} cubic-bezier(${timingFunction.join(',')})`.trim()
  },
}
