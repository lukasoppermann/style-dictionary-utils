import {PreprocessedTokens} from 'style-dictionary/types'
import { extractLetterSpacingPreprocessor } from './extractLetterSpacingPreprocessor'

describe('preprocessor: extractLetterSpacingPreprocessor', () => {
  const tokens = {
    typography: {
    heading: {
      $value: {
        fontFamily: '{fontFamily.primary}',
        fontSize: '{fontSize.base}',
        fontWeight: '{fontWeight.bold}',
        lineHeight: 1.5,
        letterSpacing: {
          value: 0.1,
          unit: 'px',
        },
      },
      $type: 'typography',
      $description: 'Heading typography style',
      isSource: true,
      filePath: 'tokens/typography/heading.json',
    },
  },
  } as PreprocessedTokens

  it('ectract Lettersapace from `typography` tokens', () => {
    expect(extractLetterSpacingPreprocessor.preprocessor(tokens, {})).toStrictEqual({
      "typography": {
        "heading": {
          "$description": "Heading typography style",
          "$type": "typography",
          "$value": {
            "fontFamily": "{fontFamily.primary}",
            "fontSize": "{fontSize.base}",
            "fontWeight": "{fontWeight.bold}",
            "lineHeight": 1.5,
          },
                    filePath: 'tokens/typography/heading.json',
          isSource: true,
        },
        "heading-letterSpacing": {
          "$type": "dimension",
          "$value": {
            "unit": "px",
            "value": 0.1,
          },
          filePath: 'tokens/typography/heading.json',
          isSource: true,
        },
      },
    })
  })
})
