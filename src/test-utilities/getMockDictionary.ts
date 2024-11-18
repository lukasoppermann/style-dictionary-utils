import {getMockToken} from './getMockToken'
import {Dictionary, TransformedTokens} from 'style-dictionary/types'

const mockDictionaryDefault = {
  tokens: {
    subgroup: {
      red: getMockToken({
        name: 'red',
        path: ['tokens', 'subgroup', 'red'],
      }),
    },
  },
}

export const getMockDictionary = (tokens?: TransformedTokens): Dictionary => ({
  allTokens: Object.values((tokens || mockDictionaryDefault).tokens.subgroup),
  tokens: tokens || mockDictionaryDefault,
  allProperties: Object.values((tokens || mockDictionaryDefault).tokens.subgroup),
  properties: tokens || mockDictionaryDefault,
  usesReference: _value => false,
  getReferences: _value => [],
})
