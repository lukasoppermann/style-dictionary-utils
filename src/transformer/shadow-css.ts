import {Transform, TransformedToken} from 'style-dictionary/types'
import {isShadow} from '../filter/isShadow.js'
import {getValue} from '../utilities/getValue.js'

type TokenShadow = {
  color: string
  offsetX: string
  offsetY: string
  blur: string
  spread: string
  inset: boolean
}

const formatShadow = ({
  offsetX = '0',
  offsetY = '0',
  blur = '0',
  spread = '0',
  color,
  inset = false,
}: TokenShadow): string => `${offsetX} ${offsetY} ${blur} ${spread} ${color} ${inset ? 'inset' : ''}`.trim()

export const shadowCss: Transform = {
  name: 'shadow/css',
  type: `value`,
  transitive: true,
  filter: isShadow,
  transform: (token: TransformedToken) => {
    const tokenValue = getValue<TokenShadow>(token)
    if (Array.isArray(tokenValue)) {
      return tokenValue.map(formatShadow).join(', ')
    }

    if (typeof tokenValue === 'object') {
      return formatShadow(tokenValue)
    }

    return tokenValue
  },
}
