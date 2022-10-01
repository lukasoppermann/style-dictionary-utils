import StyleDictionary from 'style-dictionary'

type TokenShadow = {
  color: string
  x: string
  y: string
  blur: string
  spread: string
}

export const shadowCss: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: (token: StyleDictionary.TransformedToken) => token.$type === 'shadow',
  transformer: ({ value }: { value: TokenShadow }) =>
    `${value.x || 0} ${value.y || 0} ${value.blur || 0} ${value.spread || 0} ${value.color}`
}