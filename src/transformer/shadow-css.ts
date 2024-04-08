import type { ValueTransform } from 'style-dictionary/types'
import { isShadow } from '../filter/isShadow.js'

const formatShadow = ({
  offsetX = '0',
  offsetY = '0',
  blur = '0',
  spread = '0',
  color = "#000",
}): string => `${offsetX} ${offsetY} ${blur} ${spread} ${color}`;

export const shadowCss: ValueTransform = {
  name: "shadow/css",
  type: `value`,
  transitive: true,
  filter: isShadow,
  transform: ({ value }) => {
    if (Array.isArray(value)) {
      return value.map(formatShadow).join(", ");
    }

    if (typeof value === "object") {
      return formatShadow(value);
    }

    return value;
  },
}
