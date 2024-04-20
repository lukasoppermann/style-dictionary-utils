import { typescriptEsmDeclarations } from './typescript-esm-declarations'

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
      },
      shadows: {
        small: {
          $type: 'shadow',
          value: {
            "color": "#00000066",
            "offsetX": "1px",
            "offsetY": "0px",
            "blur": "2px",
            "spread": "0px"
          }
        }
      }
    }
  }

  const file = {
    destination: 'tokens.d.ts',
    options: {
      showFileHeader: false,
    }
  }


  it('Formats tokens with prefix and rootName', () => {
    const inFile = {
      destination: 'tokens.d.ts',
      options: {
        showFileHeader: false,
        rootName: 'Tokens'
      }
    }

    const platform = {
      prefix: 'test'
    }

    const prefixedOutput = `export type Tokens = {
  test: {
    spacing: {
      small: number;
    };
    colors: {
      red: string;
    };
    shadows: {
      small: {
        color: string;
        offsetX: string;
        offsetY: string;
        blur: string;
        spread: string;
      };
    };
  };
};
`

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(typescriptEsmDeclarations({ dictionary, file: inFile, options: undefined, platform })).toStrictEqual(prefixedOutput)
  })

  it('Formats tokens without prefix', () => {
    const output = `export type DesignToken = {
  spacing: {
    small: number;
  };
  colors: {
    red: string;
  };
  shadows: {
    small: {
      color: string;
      offsetX: string;
      offsetY: string;
      blur: string;
      spread: string;
    };
  };
};
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(typescriptEsmDeclarations({ dictionary, file, options: undefined, undefined })).toStrictEqual(output)
  })

  it('Formats tokens accepting a custom prettier configuration', () => {
    const output = `export type DesignToken = {
  spacing: {
    small: number;
  };
  colors: {
    red: string;
  };
  shadows: {
    small: {
      color: string;
      offsetX: string;
      offsetY: string;
      blur: string;
      spread: string;
    };
  };
};
`

    const prettier = {
      singleQuote: true
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(typescriptEsmDeclarations({ dictionary, file, options: { prettier }, undefined })).toStrictEqual(output)
  })

})
