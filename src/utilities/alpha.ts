import { rgba, parseToRgba } from 'color2k'
/**
 * alpha
 * @param color color string like a `#334455` or `rgb(255,200,100)`
 * @param desiredAlpha number
 * @returns rgba value
 */
export const alpha = (color: string, desiredAlpha = 1): string => {
  const [r, g, b] = parseToRgba(color);
  return rgba(r, g, b, desiredAlpha);
}
