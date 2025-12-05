import {TransformedToken} from 'style-dictionary/types'
import {fontWeightCss} from './fontWeight-css'

describe('transform: fontWeight', () => {
  const items = [
    {
      $value: 300,
      $type: 'fontWeight',
    },
    {
      $value: 'bold',
      $type: 'fontWeight',
    },
    {
<<<<<<< HEAD:src/transformer/fontWeight-css.test.ts
      $value: 400,
      $type: 'fontWeight',
    },
    {
      $value: '',
=======
      value: '',
>>>>>>> 5ee12c9 (typography):src/transformer/font-weight-to-number.test.ts
    },
    {
      $value: '',
      $type: 'color',
    },
  ] as TransformedToken[]

  it('matches `fontWeight` tokens', () => {
<<<<<<< HEAD:src/transformer/fontWeight-css.test.ts
    expect(items.filter(fontWeightCss.filter)).toStrictEqual([items[0], items[1], items[2]])
=======
    expect(items.filter(fontWeightToNumber.filter)).toStrictEqual([items[0], items[1]])
>>>>>>> 5ee12c9 (typography):src/transformer/font-weight-to-number.test.ts
  })

  it('transforms `fontWeight` string to number', () => {
    expect(
<<<<<<< HEAD:src/transformer/fontWeight-css.test.ts
      items.filter(fontWeightCss.filter).map(item => fontWeightCss.transform(item, {}, {})),
    ).toStrictEqual([300, 700, 400])
=======
      items.filter(fontWeightToNumber.filter).map(item => fontWeightToNumber.transform(item, {}, {})),
    ).toStrictEqual([300, 700])
  })

  it('throws on invalid `fontWeight` number', () => {
    const invalidItem = {
      value: 1001,
      $type: 'fontWeight',
    }
    expect(() => fontWeightToNumber.transform(invalidItem, {}, {})).toThrowError(
      `Invalid numeric font weight: 1001. Must be between 0 and 1000.`,
    )
  })

  it('throws on invalid `fontWeight` string', () => {
    const invalidItem = {
      value: 'invalid-weight',
      $type: 'fontWeight',
    }
    expect(() => fontWeightToNumber.transform(invalidItem, {}, {})).toThrowError(
      `Invalid string font weight: "invalid-weight". Must be one of: thin, hairline, extra-light, ultra-light, extralight, ultralight, light, normal, regular, book, medium, semi-bold, demi-bold, semibold, demibold, bold, extra-bold, ultra-bold, extrabold, ultrabold, black, heavy, extra-black, ultra-black, extrablack, ultrablack`,
    )
>>>>>>> 5ee12c9 (typography):src/transformer/font-weight-to-number.test.ts
  })
})
