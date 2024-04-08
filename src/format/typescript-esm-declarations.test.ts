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

  it('Formats tokens with prefix and rootName', async () => {
    const fileWithRoot = {
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
    const result = await typescriptEsmDeclarations({ dictionary, file: fileWithRoot, options: undefined, platform })
    expect(result).toStrictEqual(prefixedOutput)
  })

  it('Formats tokens without prefix', async () => {
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
    const result = await typescriptEsmDeclarations({ dictionary, file, options: undefined, undefined })
    expect(result).toStrictEqual(output)
  })

  it('Formats tokens accepting a custom prettier configuration', async () => {
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
    const res = await typescriptEsmDeclarations({ dictionary, file, options: { prettier }, undefined })
    expect(res).toStrictEqual(output)
  })

})
