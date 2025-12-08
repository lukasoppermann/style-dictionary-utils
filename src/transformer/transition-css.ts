import {Transform, TransformedToken} from 'style-dictionary/types'
import {isTransitionFilter} from '../filter/isTransition.js'
import {getValue} from '../utilities/getValue.js'
import {CubicBezierTokenValue, cubicBezierTransformer} from './cubicBezier-css.js'
import {DurationTokenValue, durationValueTransformer} from './duration-css.js'

type TokenValueTransition = {
  duration: DurationTokenValue
  delay: DurationTokenValue
  timingFunction: CubicBezierTokenValue
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
      console.log(duration, delay, timingFunction)
      console.log('duration: ', durationValueTransformer(duration))
      console.log('delay: ', durationValueTransformer(delay))
      console.log('timingFunction: ', `cubic-bezier(${timingFunction})`)
      return `${durationValueTransformer(duration)} ${durationValueTransformer(delay)} ${cubicBezierTransformer(timingFunction)}`.trim()
      // catch errors and rethrow with token name
    } catch (error) {
      throw new Error(`Error transforming transition token '${token.name}': ${error}`)
    }
  },
}
