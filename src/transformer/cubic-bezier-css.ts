import StyleDictionary from 'style-dictionary'

type TokenCubicBezier = [
  x1: number,
  y1: number,
  x2: number,
  y2: number
]

export const cubicBezierCss: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: (token: StyleDictionary.TransformedToken) => token.$type === 'cubicBezier' && Array.isArray(token.value),
  transformer: ({ value: [x1, y1, x2, y2] }: { value: TokenCubicBezier }) =>
    `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2});`
}