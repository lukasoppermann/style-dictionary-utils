import {PlatformConfig, Transform, TransformedToken} from 'style-dictionary/types'
import {isColor} from '../filter/isColor.js'
import {getValue} from '../utilities/getValue.js'
import {transformColor} from '../utilities/transformColor.js'

export type ColorTokenValue = {
  colorSpace: string
  components: [number, number, number]
  alpha?: number
  hex?: string
}

/**
 * colorToCss
 * @description convert a token of type `color` to a css color value use platform.colorOutputFormat to determine the output format, if not provided defaults to `hex`, options are `hex`, `rgb`, `hsl`
 */
export const colorToCss: Transform = {
  name: 'color/css',
  type: `value`,
  transitive: true,
  filter: isColor.filter,
  transform: (token: TransformedToken, platform: PlatformConfig | undefined) =>
    transformColor(getValue<ColorTokenValue>(token), platform?.colorOutputFormat || 'hex'),
}
