import type { ValueTransform } from 'style-dictionary/types'
import { isBorder } from '../filter/isBorder.js'
import type { TransformedToken } from 'style-dictionary/types';

/**
 * @description convert a w3c `border` token to a value that can be used with the css `border` property
 */
export const borderCss: ValueTransform = {
  name: 'border/css',
  type: 'value',
  transitive: true,
  filter: isBorder,
  transform: ({ value }: TransformedToken) => {
    if(typeof value.style !== 'string') throw new Error("Only string stroke styles are supported for border tokens");
    return `${value.width} ${value.style} ${value.color}`
  }
}