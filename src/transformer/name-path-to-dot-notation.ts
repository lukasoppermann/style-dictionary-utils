import StyleDictionary from 'style-dictionary'

const capitalize = ([firstLetter, ...restOfWord]: string): string => {
  return firstLetter.toUpperCase() + restOfWord.join("")
}

const camelCase = (string: string): string => {
  return string
    .split(/[\s-_\+]+/g)
    .map((part: string, index: number) => index === 0 ? part : capitalize(part))
    .join("")
}
/**
 * namePathToDotNotation
 * @description convert the entire `path` to dot notation, parts are converted to camelCase
 * and replaces the `name` with the dot notation path
 */
export const namePathToDotNotation: StyleDictionary.Transform = {
  type: `name`,
  transformer: (token: StyleDictionary.TransformedToken, platform?: StyleDictionary.Platform): string => {
    return [platform?.prefix, ...token.path]
      .filter((part: unknown): part is string => typeof part === 'string')
      .map(part => camelCase(part)).join('.')
  }
}