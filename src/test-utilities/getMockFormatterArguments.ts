import type {FormatFnArguments} from 'style-dictionary/types/Format'
import {getMockDictionary} from './getMockDictionary'

const defaultFormatterArguments: FormatFnArguments = {
  dictionary: getMockDictionary(),
  file: {
    destination: 'tokens.ts',
    options: {
      showFileHeader: false,
    },
  },
  options: {},
  platform: {},
}

export const getMockFormatterArguments = (overrides?: Partial<FormatFnArguments>): FormatFnArguments => {
  return {
    ...defaultFormatterArguments,
    ...(overrides || {}),
  }
}
