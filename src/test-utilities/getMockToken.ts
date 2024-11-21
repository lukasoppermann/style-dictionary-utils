import {TransformedToken} from 'style-dictionary/types'

const mockTokenDefaults = {
  name: 'tokenName',
  path: ['path'],
  original: {
    value: 'originalValue',
    attributes: {},
  },
  filePath: 'file.json',
  isSource: true,
  value: 'transformedValue',
  attributes: {},
}
/**
 *
 * @param valueOverrides partial StyleDictionary.TransformedToken
 * @returns StyleDictionary.TransformedToken - a merge of {@link mockTokenDefaults} and any valid properties provided in the valueOverrides param
 */
export const getMockToken = (valueOverrides: {[key: keyof TransformedToken]: unknown}): TransformedToken => {
  if (valueOverrides?.$value !== undefined) {
    // @ts-expect-error: due to test
    delete mockTokenDefaults.value
  }

  return {
    ...mockTokenDefaults,
    ...valueOverrides,
  }
}
