import { typescriptEsmDeclarations } from '../../src/format/typescript-esm-declarations'

describe.only('Format: ESM Declarations', () => {
  const dictionary = {
    tokens: {
      spacing: {
        small: {
          $type: "dimension",
          value: 4,
        },
      },
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
    destination: 'tokens.d.ts',
    options: {
      showFileHeader: false,
    }
  }

  it('Formats tokens adding prefix', () => {
    const inFile = {
      destination: 'tokens.d.ts',
      options: {
        showFileHeader: false,
        rootName: 'Tokens'
      }
    }

    const output = `export type Tokens = {
  test: {
    spacing: {
      small: number;
    };
    colors: {
      red: string;
    };
  };
};
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(typescriptEsmDeclarations({dictionary, file: inFile, options: undefined, platform})).toStrictEqual(output)
  })

  it('Formats tokens without prefix', () => {
    const output = `export type DesignToken = {
  spacing: {
    small: number;
  };
  colors: {
    red: string;
  };
};
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(typescriptEsmDeclarations({dictionary, file, options: undefined, undefined})).toStrictEqual(output)
  })

  it('Formats tokens accepting a custom prettier configuration', () => {
    const output = `export type DesignToken = {
  spacing: {
    small: number;
  };
  colors: {
    red: string;
  };
};
`
    const prettier = {
      singleQuote: true
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(typescriptEsmDeclarations({dictionary, file, options: {prettier}, undefined})).toStrictEqual(output)
  })

})
