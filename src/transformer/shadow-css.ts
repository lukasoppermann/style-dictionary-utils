import { Transform, TransformedToken } from 'style-dictionary/types'
import { isShadow } from '../filter/isShadow'

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
  inset = false
}: TokenShadow ): string => `${offsetX} ${offsetY} ${blur} ${spread} ${color} ${inset ? 'inset' : ''}`.trim();

export const shadowCss: Transform = {
  name: 'shadow/css',
  type: `value`,
  transitive: true,
  filter: isShadow,
  transform: ({value}: Omit<TransformedToken, 'value'> & { value?: string | TokenShadow}) => {
    if (Array.isArray(value)) {
      return value.map(formatShadow).join(", ");
    }

    if (typeof value === "object") {
      return formatShadow(value);
    }

    return value;
  },
}
