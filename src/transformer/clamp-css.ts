import {Transform, TransformedToken} from 'style-dictionary/types'
import {isClampFilter} from '../filter/isClamp.js'
import {getValue} from '../utilities/getValue.js'

type TokenClamp = {
  min: string
  ideal: string
  max: string
}

export const clampCss: Transform = {
  name: 'clamp/css',
  type: `value`,
  transitive: true,
  filter: isClampFilter,
  transform: (token: Omit<TransformedToken, 'value'> & {value?: TokenClamp}) => {
    const tokenValue = getValue<Omit<TransformedToken, 'value'> & {value?: TokenClamp}>(token)
    if (!tokenValue) return
    return `clamp(${tokenValue.min}, ${tokenValue.ideal}, ${tokenValue.max})`
  },
}
