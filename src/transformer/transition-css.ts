import {Transform, TransformedToken} from 'style-dictionary/types'
import {isTransitionFilter} from '../filter/isTransition.js'
import {getValue} from '../utilities/getValue.js'
import {TokenValueCubicBezier} from './cubic-bezier-css.js'
import {DurationTokenValue, durationValueTransformer} from './duration-css.js'

type TokenValueTransition = {
  duration: DurationTokenValue
  delay: DurationTokenValue
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
  filter: isTransitionFilter,
  transform: (token: TransformedToken) => {
    try {
      const {duration, delay, timingFunction} = getValue<TokenValueTransition>(token)
      return `${durationValueTransformer(duration)} ${durationValueTransformer(delay)} cubic-bezier(${timingFunction.join(',')})`.trim()
      // catch errors and rethrow with token name
    } catch (error) {
      throw new Error(`Error transforming transition token '${token.name}': ${error}`)
    }
  },
}
