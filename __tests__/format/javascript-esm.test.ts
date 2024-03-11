import {javascriptEsm} from '../../src/format/javascript-esm.js'

describe('Format: ESM', () => {
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

  it('Formats tokens adding prefix', async () => {
    const output = `export default {
  test: {
    colors: {
      red: "#FF0000",
    },
  },
};
`
    // @ts-expect-error: fake values to test formatter
    const result = await javascriptEsm({ dictionary, file, options: undefined, platform })
    expect(result).toStrictEqual(output)
  })

  it('Formats tokens without prefix', async () => {
    const output = `export default {
  colors: {
    red: "#FF0000",
  },
};
`
    // @ts-expect-error: fake values to test formatter
    const result = await javascriptEsm({ dictionary, file, options: undefined, undefined })
    expect(result).toStrictEqual(output)
  })

  it('Formats tokens accepting a custom prettier configuration', async () => {
    const output = `export default {
  colors: {
    red: '#FF0000',
  },
};
`
    const prettier = {
      singleQuote: true
    }
    // @ts-expect-error: fake values to test formatter
    const result = await javascriptEsm({ dictionary, file, options: { prettier }, undefined })
    expect(result).toStrictEqual(output)
  })

})
