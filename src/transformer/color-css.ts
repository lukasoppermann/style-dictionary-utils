import {PlatformConfig, Transform, TransformedToken} from 'style-dictionary/types'
import {isColorFilter} from '../filter/isColor.js'
import {getValue} from '../utilities/getValue.js'
import Color from 'colorjs.io'

export type ColorTokenValue = {
  colorSpace: string
  components: [number, number, number]
  alpha?: number
  hex?: string
}

const getRgb255 = (color: Color) => {
  const rgb = color.to('srgb').coords
  const [r, g, b] = rgb.map(x => Math.round(x * 255))
  return `rgba(${r}, ${g}, ${b}, ${color.alpha})`
}

const getRgbFloat = (color: Color) => {
  const rgb = color.to('srgb').coords
  const [r, g, b] = rgb.map(x => parseFloat(x.toFixed(3)))
  return {r, g, b, a: color.alpha}
}

const getHsl = (color: Color) => {
  const hsl = color.to('hsl').coords
  const [h, s, l] = [Math.round(hsl[0]), Math.round(hsl[1]), Math.round(hsl[2])]
  return `hsl(${h}deg ${s}% ${l}% / ${color.alpha})`
}

const getHex = (color: Color) => {
  const rgb = color.to('srgb')
  // return hex string
  return rgb.toString({format: 'hex', alpha: true})
}

const getColorSpace = (colorSpace: string) => {
  switch (colorSpace) {
    case 'display-p3':
      return 'p3'
    case 'a98-rgb':
      return 'a98rgb'
    case 'prophoto-rgb':
      return 'prophoto'
    default:
      return colorSpace
  }
}

export const transformColor = (
  colorValue: ColorTokenValue,
  outputFormat: 'hex' | 'hsl' | 'hsla' | 'rgb' | 'rgba' | 'rgbFloat' = 'hex',
) => {
  const {colorSpace, components, alpha = 1} = colorValue

  const color = new Color({space: getColorSpace(colorSpace), coords: components, alpha})

  switch (outputFormat) {
    case 'rgb':
    case 'rgba':
      return getRgb255(color)
    case 'rgbFloat':
      return getRgbFloat(color)
    case 'hsl':
    case 'hsla':
      return getHsl(color)
    default:
      return getHex(color)
  }
}

/**
 * colorToCss
 * @description convert a token of type `color` to a css color value use platform.colorOutputFormat to determine the output format, if not provided defaults to `hex`, options are `hex`, `rgb`, `hsl`
 */
export const colorCss: Transform = {
  name: 'color/css',
  type: `value`,
  transitive: true,
  filter: isColorFilter,
  transform: (token: TransformedToken, platform: PlatformConfig | undefined) => {
    const color = transformColor(getValue<ColorTokenValue>(token), platform?.colorOutputFormat || 'hex')
    // apply alpha from $extension if present
    const {$extensions: {alpha} = {}} = token

    if (alpha !== undefined) {
      return `color-mix(color-mix(in srgb, ${color}, transparent ${100 * alpha}%)`
    }

    return color
  },
}
