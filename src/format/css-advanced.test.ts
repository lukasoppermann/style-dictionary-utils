import {cssAdvanced} from './css-advanced.js'
import {TransformedToken} from 'style-dictionary/types'

describe('Format: CSS Advanced', () => {
  //StyleDictionary.Dictionary
  const dictionary = {
    allTokens: [
      {
        name: 'color-background-primary',
        path: ['color', 'background', 'primary'],
        original: {
          name: 'color-background-primary',
          $value: '#FF0000',
          attributes: {
            category: '',
          },
        },
        filePath: './src/tokens/color.dark.json',
        isSource: true,
        $type: 'color',
        $value: '#FF0000',
        attributes: {
          category: '',
        },
        $extensions: {
          'org.primer.mediaQuery': '@media (min-width: 768px)',
        },
      },
      {
        name: 'color-background-secondary',
        path: ['color', 'background', 'secondary'],
        original: {
          name: 'color-background-secondary',
          $value: '#0000ff',
          attributes: {
            category: '',
          },
        },
        filePath: './src/tokens/color.light.json',
        isSource: true,
        $type: 'color',
        $value: '#0000ff',
        attributes: {
          category: '',
        },
      },
      {
        name: 'color-background-green',
        path: ['color', 'background', 'green'],
        original: {
          name: 'color-background-green',
          $value: '#00ff00',
          attributes: {
            category: '',
          },
        },
        filePath: './src/tokens/color.base.json',
        isSource: true,
        $type: 'color',
        $value: '#00ff00',
        attributes: {
          category: '',
        },
      },
    ],
  }

  const platform = {
    prefix: 'customPrefix',
  }

  const file = {
    destination: 'tokens.css',
    options: {
      showFileHeader: false,
      rules: [
        {
          atRule: '@media (prefers-color-scheme: dark)',
          matcher: (token: TransformedToken) => token.filePath.includes('dark'),
        },
        {
          atRule: '@media (prefers-color-scheme: light)',
          matcher: (token: TransformedToken) => token.filePath.includes('light'),
        },
        {
          atRule: '@media screen',
          matcher: (token: TransformedToken) => !token.filePath.includes('light') && !token.filePath.includes('dark'),
        },
      ],
    },
  }

  it('Formats tokens with queries per file path', async () => {
    const output = `@media (prefers-color-scheme: dark) {
  :root {
    --color-background-primary: #ff0000;
  }
}
@media (prefers-color-scheme: light) {
  :root {
    --color-background-secondary: #0000ff;
  }
}
@media screen {
  :root {
    --color-background-green: #00ff00;
  }
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(await cssAdvanced.format({dictionary, file, options: {usesDtcg: true}, platform})).toStrictEqual(output)
  })

  it('Formats tokens with only one media query', async () => {
    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        rules: [
          {
            atRule: '@media (prefers-color-scheme: dark)',
            matcher: (_token: TransformedToken) => true,
          },
        ],
      },
    }

    const output = `@media (prefers-color-scheme: dark) {
  :root {
    --color-background-primary: #ff0000;
    --color-background-secondary: #0000ff;
    --color-background-green: #00ff00;
  }
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(
      await cssAdvanced.format({dictionary, file: fileOptions, options: {usesDtcg: true}, platform}),
    ).toStrictEqual(output)
  })

  it('Formats tokens with one rule with nested atRule', async () => {
    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        rules: [
          {
            atRule: ['@media (prefers-color-scheme: dark)', '@supports (display: grid)'],
            matcher: (_token: TransformedToken) => true,
          },
        ],
      },
    }

    const output = `@media (prefers-color-scheme: dark) {
  @supports (display: grid) {
    :root {
      --color-background-primary: #ff0000;
      --color-background-secondary: #0000ff;
      --color-background-green: #00ff00;
    }
  }
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(
      await cssAdvanced.format({dictionary, file: fileOptions, options: {usesDtcg: true}, platform}),
    ).toStrictEqual(output)
  })

  it('Formats tokens with only one media query without matcher', async () => {
    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        rules: [
          {
            atRule: '@media (prefers-color-scheme: light)',
          },
        ],
      },
    }

    const output = `@media (prefers-color-scheme: light) {
  :root {
    --color-background-primary: #ff0000;
    --color-background-secondary: #0000ff;
    --color-background-green: #00ff00;
  }
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(
      await cssAdvanced.format({dictionary, file: fileOptions, options: {usesDtcg: true}, platform}),
    ).toStrictEqual(output)
  })

  it('Formats tokens with media query defined in token', async () => {
    const customDict = JSON.parse(JSON.stringify(dictionary))
    customDict.allTokens[1].$extensions = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: update for test
      mediaQuery: '@media (min-width: 868px)',
    }

    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        rules: undefined,
      },
    }
    const output = `:root {
  --color-background-primary: #ff0000;
  --color-background-secondary: #0000ff;
  --color-background-green: #00ff00;
}
@media (min-width: 868px) {
  :root {
    --color-background-secondary: #0000ff;
  }
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(
      await cssAdvanced.format({dictionary: customDict, file: fileOptions, options: {usesDtcg: true}, platform}),
    ).toStrictEqual(output)
  })

  it('Formats tokens with custom media query defined in token and custom queryExtensionProperty', async () => {
    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        rules: undefined,
        queryExtensionProperty: 'org.primer.mediaQuery',
      },
    }
    const output = `:root {
  --color-background-primary: #ff0000;
  --color-background-secondary: #0000ff;
  --color-background-green: #00ff00;
}
@media (min-width: 768px) {
  :root {
    --color-background-primary: #ff0000;
  }
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(
      await cssAdvanced.format({dictionary, file: fileOptions, options: {usesDtcg: true}, platform}),
    ).toStrictEqual(output)
  })

  it('Formats tokens with no queries defined', async () => {
    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        rules: undefined,
      },
    }

    const output = `:root {
  --color-background-primary: #ff0000;
  --color-background-secondary: #0000ff;
  --color-background-green: #00ff00;
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(
      await cssAdvanced.format({dictionary, file: fileOptions, options: {usesDtcg: true}, platform}),
    ).toStrictEqual(output)
  })

  it('Formats tokens with no atRule but selector', async () => {
    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        selector: '[data-theme="dark"]',
        rules: [
          {
            matcher: (token: TransformedToken) => {
              return token.original.name === 'color-background-primary'
            },
          },
          {
            atRule: '@media (min-width: 768px)',
            matcher: (token: TransformedToken) => token.original.name !== 'color-background-primary',
          },
        ],
      },
    }

    const output = `[data-theme="dark"] {
  --color-background-primary: #ff0000;
}
@media (min-width: 768px) {
  [data-theme="dark"] {
    --color-background-secondary: #0000ff;
    --color-background-green: #00ff00;
  }
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(
      await cssAdvanced.format({dictionary, file: fileOptions, options: {usesDtcg: true}, platform}),
    ).toStrictEqual(output)
  })

  it('Ignore empty groups', async () => {
    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        rules: [
          {
            atRule: '@media (prefers-color-scheme: dark)',
            matcher: (token: TransformedToken) => token.filePath.includes('notDark'),
          },
          {
            atRule: '@media (prefers-color-scheme: light)',
            matcher: (token: TransformedToken) => token.filePath.includes('light'),
          },
          {
            atRule: '@media screen',
            matcher: (token: TransformedToken) => !token.filePath.includes('light') && !token.filePath.includes('dark'),
          },
        ],
      },
    }

    const output = `@media (prefers-color-scheme: light) {
  :root {
    --color-background-secondary: #0000ff;
  }
}
@media screen {
  :root {
    --color-background-green: #00ff00;
  }
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(
      await cssAdvanced.format({dictionary, file: fileOptions, options: {usesDtcg: true}, platform}),
    ).toStrictEqual(output)
  })

  it('Formats tokens with custom selector', async () => {
    const fileOptions = {
      ...file,
      options: {
        selector: `body[theme="dark"]`,
        ...file.options,
        rules: undefined,
      },
    }

    const output = `body[theme="dark"] {
  --color-background-primary: #ff0000;
  --color-background-secondary: #0000ff;
  --color-background-green: #00ff00;
}
`
    expect(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: fake values to test formatter
  await cssAdvanced.format({dictionary, file: fileOptions, options: {usesDtcg: true}, platform}),
).toStrictEqual(output)
  })

  it('Formats tokens with default selector', async () => {
    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        rules: undefined,
      },
    }

    const output = `:root {
  --color-background-primary: #ff0000;
  --color-background-secondary: #0000ff;
  --color-background-green: #00ff00;
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(
      await cssAdvanced.format({dictionary, file: fileOptions, options: {usesDtcg: true}, platform}),
    ).toStrictEqual(output)
  })

  it('Formats tokens without selector', async () => {
    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        selector: false,
        rules: undefined,
      },
    }

    const fileOptionsTwo = {
      ...file,
      options: {
        ...file.options,
        selector: 'body',
        rules: [
          {
            selector: false,
          },
        ],
      },
    }

    const output = `--color-background-primary: #ff0000;
--color-background-secondary: #0000ff;
--color-background-green: #00ff00;
`
    expect(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: fake values to test formatter
      await cssAdvanced.format({dictionary, file: fileOptions, options: {usesDtcg: true}, platform}),
    ).toStrictEqual(output)

    expect(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: fake values to test formatter
      await cssAdvanced.format({dictionary, file: fileOptionsTwo, options: {usesDtcg: true}, platform}),
    ).toStrictEqual(output)
  })

  it('Formats tokens with invalid selector', async () => {
    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        selector: undefined,
        rules: [
          {
            selector: ['selector', 'selector2'],
            matcher: (token: TransformedToken) => token.original.name !== 'color-background-primary',
          },
        ],
      },
    }

    const output = `:root {
  --color-background-secondary: #0000ff;
  --color-background-green: #00ff00;
}
`
    expect(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: fake values to test formatter
      await cssAdvanced.format({dictionary, file: fileOptions, options: {usesDtcg: true}, platform}),
    ).toStrictEqual(output)
  })
})
