import {Transform, TransformedToken} from 'style-dictionary/types'
import {isClamp} from '../filter/isClamp.js'

type TokenClamp = {
  min: string
  ideal: string
  max: string
}

export const clampCss: Transform = {
  name: 'clamp/css',
  type: `value`,
  transitive: true,
  filter: isClamp,
  transform: ({value}: Omit<TransformedToken, 'value'> & {value?: TokenClamp}) => {
    if (!value) return
    return `clamp(${value.min}, ${value.ideal}, ${value.max})`
  },
}
