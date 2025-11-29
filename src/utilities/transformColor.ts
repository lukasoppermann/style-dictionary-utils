import Color from 'colorjs.io'
import {ColorTokenValue} from '../transformer/color-to-css'

const getRgb255 = (color: Color) => {
  const rgb = color.to('srgb').coords
  const [r, g, b] = rgb.map(x => Math.round(x * 255))
  return `rgba(${r}, ${g}, ${b}, ${color.alpha})`
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
  outputFormat: 'hex' | 'hsl' | 'hsla' | 'rgb' | 'rgba' = 'hex',
) => {
  const {colorSpace, components, alpha = 1} = colorValue

  const color = new Color({space: getColorSpace(colorSpace), coords: components, alpha})

  switch (outputFormat) {
    case 'rgb':
    case 'rgba':
      return getRgb255(color)
    case 'hsl':
    case 'hsla':
      return getHsl(color)
    default:
      return getHex(color)
  }
}