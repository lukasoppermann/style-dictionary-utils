import {toRgba} from 'color2k'
import {PlatformConfig, Transform, TransformedToken} from 'style-dictionary/types'
import {isColor} from '../filter/isColor.js'
import {getValue} from '../utilities/getValue.js'
import { transformColor } from '../utilities/transformColor.js'

export type ColorTokenValue = {
  colorSpace: string,
  components: [number, number, number],
  alpha?: number,
  hex?: string
}

/**
 * colorToCss
 * @description convert a token of type `color` to a css color value
 */
export const colorToCss: Transform = {
  name: 'color/css',
  type: `value`,
  transitive: true,
  filter: isColor,
  transform: (token: TransformedToken, platform: PlatformConfig | undefined) => transformColor(getValue<ColorTokenValue>(token), platform?.colorOutputFormat || 'hex'),
}
