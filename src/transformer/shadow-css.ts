import {PlatformConfig, Transform, TransformedToken} from 'style-dictionary/types'
import {isShadow} from '../filter/isShadow.js'
import {getValue} from '../utilities/getValue.js'
import {transformDimensionValue, DimensionTokenValue} from './dimension.js'
import {transformColor} from '../utilities/transformColor.js'
import {ColorTokenValue} from './color-to-css.js'

type TokenShadow = {
  color: ColorTokenValue
  offsetX: DimensionTokenValue
  offsetY: DimensionTokenValue
  blur: DimensionTokenValue
  spread: DimensionTokenValue
  inset?: boolean
}

const formatShadow = (
  {offsetX, offsetY, blur, spread, color, inset = false}: TokenShadow,
  platform: PlatformConfig | undefined,
): string =>
  `${inset ? 'inset' : ''} ${transformDimensionValue(offsetX, platform)} ${transformDimensionValue(offsetY, platform)} ${transformDimensionValue(blur, platform)} ${transformDimensionValue(spread, platform)} ${transformColor(color)}`.trim()
export const shadowCss: Transform = {
  name: 'shadow/css',
  type: `value`,
  transitive: true,
  filter: isShadow.filter,
  transform: (token: TransformedToken, platform: PlatformConfig | undefined) => {
    const tokenValue = getValue<TokenShadow>(token)
    if (Array.isArray(tokenValue)) {
      return tokenValue.map(shadow => formatShadow(shadow, platform)).join(', ')
    }

    if (typeof tokenValue === 'object') {
      return formatShadow(tokenValue, platform)
    }

    return tokenValue
  },
}
