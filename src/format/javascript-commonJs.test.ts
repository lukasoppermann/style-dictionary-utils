import { javascriptCommonJs } from './javascript-commonJs'

describe('Format: CommonJs', () => {
  const dictionary = {
    tokens: {
      colors: {
        red: {
          $type: 'color',
          value: '#FF0000'
        }
      }
    }
  }

  const platform = {
    prefix: 'test'
  }

  const file = {
    destination: 'tokens.ts',
    options: {
      showFileHeader: false
    }
  }

  it('Formats tokens adding prefix', () => {
    const output = `exports.default = {
  test: {
    colors: {
      red: "#FF0000",
    },
  },
};
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(javascriptCommonJs({ dictionary, file, options: undefined, platform })).toStrictEqual(output)
  })

  it('Formats tokens without prefix', () => {
    const output = `exports.default = {
  colors: {
    red: "#FF0000",
  },
};
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(javascriptCommonJs({ dictionary, file, options: undefined, undefined })).toStrictEqual(output)
  })

  it('Formats tokens accepting a custom prettier configuration', () => {
    const output = `exports.default = {
  colors: {
    red: '#FF0000',
  },
};
`
    const prettier = {
      singleQuote: true
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(javascriptCommonJs({ dictionary, file, options: { prettier }, undefined })).toStrictEqual(output)
  })

})
