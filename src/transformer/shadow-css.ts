import type { ValueTransform } from 'style-dictionary/types'
import { isShadow } from '../filter/isShadow.js'
import type { TransformedToken } from 'style-dictionary/types';

export const shadowCss: Omit<ValueTransform, 'name'> = {
  type: `value`,
  transitive: true,
  matcher: isShadow,
  transformer: ({ value }: TransformedToken) =>
  typeof value === 'string'
    ? value
    : `${value.offsetX || 0} ${value.offsetY || 0} ${value.blur || 0} ${value.spread || 0} ${value.color}`,
}
