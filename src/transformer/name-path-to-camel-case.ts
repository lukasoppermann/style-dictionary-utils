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
 * namePathToCameCase
 * @description convert the entire `path` to camel case and replaces the name
 */
export const namePathToCamelCase: StyleDictionary.Transform = {
  type: `name`,
  transformer: (token: StyleDictionary.TransformedToken, platform?: StyleDictionary.Platform): string => {
    return camelCase([platform?.prefix, ...token.path]
      .filter((part: unknown): part is string => typeof part === 'string')
      .join("-"))
  }
}