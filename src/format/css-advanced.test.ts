import StyleDictionary from 'style-dictionary'
import { cssAdvanced } from './css-advanced'

describe('Format: CSS Advanced', () => {
  //StyleDictionary.Dictionary
  const dictionary = {
    allTokens: [{
      name: "color-background-primary",
      path: ['color', 'background', 'primary'],
      original: {
        name: "color-background-primary",
        value: '#FF0000',
        attributes: {
          category: "",
        }
      },
      filePath: "./src/tokens/color.dark.json",
      isSource: true,
      $type: 'color',
      value: '#FF0000',
      attributes: {
        category: "",
      },
      $extensions: {
        "org.primer.mediaQuery": "@media (min-width: 768px)"
      }
    }, {
      name: "color-background-secondary",
      path: ['color', 'background', 'secondary'],
      original: {
        name: "color-background-secondary",
        value: '#0000ff',
        attributes: {
          category: "",
        }
      },
      filePath: "./src/tokens/color.light.json",
      isSource: true,
      $type: 'color',
      value: '#0000ff',
      attributes: {
        category: "",
      },
    }, {
      name: "color-background-green",
      path: ['color', 'background', 'green'],
      original: {
        name: "color-background-green",
        value: '#00ff00',
        attributes: {
          category: "",
        }
      },
      filePath: "./src/tokens/color.base.json",
      isSource: true,
      $type: 'color',
      value: '#00ff00',
      attributes: {
        category: "",
      }
    }]
  }

  const platform = {
    prefix: 'customPrefix'
  }

  const file = {
    destination: 'tokens.css',
    options: {
      showFileHeader: false,
      rules: [{
        atRule: '@media (prefers-color-scheme: dark)',
        matcher: (token: StyleDictionary.TransformedToken) => token.filePath.includes('dark'),
      },
      {
        atRule: '@media (prefers-color-scheme: light)',
        matcher: (token: StyleDictionary.TransformedToken) => token.filePath.includes('light'),
      },
      {
        atRule: '@media screen',
        matcher: (token: StyleDictionary.TransformedToken) => !token.filePath.includes('light') && !token.filePath.includes('dark'),
      }]
    }
  }

  it('Formats tokens with queries per file path', () => {
    const output = `@media (prefers-color-scheme: dark) {
  :root {
    --customPrefix-color-background-primary: #ff0000;
  }
}
@media (prefers-color-scheme: light) {
  :root {
    --customPrefix-color-background-secondary: #0000ff;
  }
}
@media screen {
  :root {
    --customPrefix-color-background-green: #00ff00;
  }
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(cssAdvanced({ dictionary, file, options: undefined, platform })).toStrictEqual(output)
  })

  it('Formats tokens with only one media query', () => {

    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        rules: [{
          atRule: '@media (prefers-color-scheme: dark)',
          matcher: (_token: StyleDictionary.TransformedToken) => true,
        }]
      }
    }

    const output = `@media (prefers-color-scheme: dark) {
  :root {
    --customPrefix-color-background-primary: #ff0000;
    --customPrefix-color-background-secondary: #0000ff;
    --customPrefix-color-background-green: #00ff00;
  }
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(cssAdvanced({ dictionary, file: fileOptions, options: undefined, platform })).toStrictEqual(output)
  })

  it('Formats tokens with one rule with nested atRule', () => {

    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        rules: [{
          atRule: ['@media (prefers-color-scheme: dark)', '@supports (display: grid)'],
          matcher: (_token: StyleDictionary.TransformedToken) => true,
        }]
      }
    }

    const output = `@media (prefers-color-scheme: dark) {
  @supports (display: grid) {
    :root {
      --customPrefix-color-background-primary: #ff0000;
      --customPrefix-color-background-secondary: #0000ff;
      --customPrefix-color-background-green: #00ff00;
    }
  }
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(cssAdvanced({ dictionary, file: fileOptions, options: undefined, platform })).toStrictEqual(output)
  })

  it('Formats tokens with only one media query without matcher', () => {

    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        rules: [{
          atRule: '@media (prefers-color-scheme: light)',
        }]
      }
    }

    const output = `@media (prefers-color-scheme: light) {
  :root {
    --customPrefix-color-background-primary: #ff0000;
    --customPrefix-color-background-secondary: #0000ff;
    --customPrefix-color-background-green: #00ff00;
  }
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(cssAdvanced({ dictionary, file: fileOptions, options: undefined, platform })).toStrictEqual(output)
  })

  it('Formats tokens with media query defined in token', () => {

    const customDict = JSON.parse(JSON.stringify(dictionary))
    customDict.allTokens[1].$extensions = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: update for test
      "mediaQuery": "@media (min-width: 868px)"
    }

    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        rules: undefined,
      }
    }
    const output = `:root {
  --customPrefix-color-background-primary: #ff0000;
  --customPrefix-color-background-secondary: #0000ff;
  --customPrefix-color-background-green: #00ff00;
}
@media (min-width: 868px) {
  :root {
    --customPrefix-color-background-secondary: #0000ff;
  }
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(cssAdvanced({ dictionary: customDict, file: fileOptions, options: undefined, platform })).toStrictEqual(output)
  })

  it('Formats tokens with custom media query defined in token and custom queryExtensionProperty', () => {

    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        rules: undefined,
        queryExtensionProperty: "org.primer.mediaQuery"
      }
    }
    const output = `:root {
  --customPrefix-color-background-primary: #ff0000;
  --customPrefix-color-background-secondary: #0000ff;
  --customPrefix-color-background-green: #00ff00;
}
@media (min-width: 768px) {
  :root {
    --customPrefix-color-background-primary: #ff0000;
  }
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(cssAdvanced({ dictionary, file: fileOptions, options: undefined, platform })).toStrictEqual(output)
  })

  it('Formats tokens with no queries defined', () => {

    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        rules: undefined
      }
    }

    const output = `:root {
  --customPrefix-color-background-primary: #ff0000;
  --customPrefix-color-background-secondary: #0000ff;
  --customPrefix-color-background-green: #00ff00;
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(cssAdvanced({ dictionary, file: fileOptions, options: undefined, platform })).toStrictEqual(output)
  })

  it('Formats tokens with no atRule but selector', () => {

    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        selector: '[data-theme="dark"]',
        rules: [
          {
            matcher: (token: StyleDictionary.TransformedToken) => {
              return token.original.name === 'color-background-primary'
            },
          },
          {
            atRule: '@media (min-width: 768px)',
            matcher: (token: StyleDictionary.TransformedToken) => token.original.name !== 'color-background-primary',
          }
        ]
      }
    }

    const output = `[data-theme="dark"] {
  --customPrefix-color-background-primary: #ff0000;
}
@media (min-width: 768px) {
  [data-theme="dark"] {
    --customPrefix-color-background-secondary: #0000ff;
    --customPrefix-color-background-green: #00ff00;
  }
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(cssAdvanced({ dictionary, file: fileOptions, options: undefined, platform })).toStrictEqual(output)
  })

  it('Ignore empty groups', () => {
    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        rules: [{
          atRule: '@media (prefers-color-scheme: dark)',
          matcher: (token: StyleDictionary.TransformedToken) => token.filePath.includes('notDark'),
        },
        {
          atRule: '@media (prefers-color-scheme: light)',
          matcher: (token: StyleDictionary.TransformedToken) => token.filePath.includes('light'),
        },
        {
          atRule: '@media screen',
          matcher: (token: StyleDictionary.TransformedToken) => !token.filePath.includes('light') && !token.filePath.includes('dark'),
        }]
      }
    }

    const output = `@media (prefers-color-scheme: light) {
  :root {
    --customPrefix-color-background-secondary: #0000ff;
  }
}
@media screen {
  :root {
    --customPrefix-color-background-green: #00ff00;
  }
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(cssAdvanced({ dictionary, file: fileOptions, options: undefined, platform })).toStrictEqual(output)
  })

  it('Formats tokens with custom selector', () => {

    const fileOptions = {
      ...file,
      options: {
        selector: `body[theme="dark"]`,
        ...file.options,
        rules: undefined
      }
    }

    const output = `body[theme="dark"] {
  --customPrefix-color-background-primary: #ff0000;
  --customPrefix-color-background-secondary: #0000ff;
  --customPrefix-color-background-green: #00ff00;
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(cssAdvanced({ dictionary, file: fileOptions, options: undefined, platform })).toStrictEqual(output)
  })

  it('Formats tokens with default selector', () => {

    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        rules: undefined
      }
    }

    const output = `:root {
  --customPrefix-color-background-primary: #ff0000;
  --customPrefix-color-background-secondary: #0000ff;
  --customPrefix-color-background-green: #00ff00;
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(cssAdvanced({ dictionary, file: fileOptions, options: undefined, platform })).toStrictEqual(output)
  })

  it('Formats tokens without selector', () => {

    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        selector: false,
        rules: undefined
      }
    }

    const fileOptionsTwo = {
      ...file,
      options: {
        ...file.options,
        selector: "body",
        rules: [{
          selector: false,
        }]
      }
    }

    const output = `--customPrefix-color-background-primary: #ff0000;
--customPrefix-color-background-secondary: #0000ff;
--customPrefix-color-background-green: #00ff00;
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(cssAdvanced({ dictionary, file: fileOptions, options: undefined, platform })).toStrictEqual(output)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(cssAdvanced({ dictionary, file: fileOptionsTwo, options: undefined, platform })).toStrictEqual(output)
  })

  it('Formats tokens with invalid selector', () => {

    const fileOptions = {
      ...file,
      options: {
        ...file.options,
        selector: undefined,
        rules: [
          {
            selector: ["selector", "selector2"],
            matcher: (token: StyleDictionary.TransformedToken) => token.original.name !== 'color-background-primary',
          }
        ]
      }
    }

    const output = `:root {
  --customPrefix-color-background-secondary: #0000ff;
  --customPrefix-color-background-green: #00ff00;
}
`
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: fake values to test formatter
    expect(cssAdvanced({ dictionary, file: fileOptions, options: undefined, platform })).toStrictEqual(output)
  })
})