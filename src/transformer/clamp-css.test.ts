import {TransformedToken} from 'style-dictionary/types'
import {clampCss} from './clamp-css'

describe('transform: clampCss', () => {
  const items = [
    {
      value: '',
      $type: 'clamp',
    },
    {
      value: {
        min: '1.5rem',
        ideal: '5vw',
        max: '2.5rem',
      },
      $type: 'clamp',
    },
    {
      $value: {
        min: '.5rem',
        ideal: '5vw',
        max: '2.5rem',
      },
      $type: 'clamp',
    },
    {
      value: '',
    },
  ] as TransformedToken[]

  it('matches `clamp` tokens', () => {
    expect(items.filter(clampCss.filter)).toStrictEqual([items[1], items[2]])
  })

  it('transforms `clamp` tokens', () => {
    expect(items.filter(clampCss.filter).map(item => clampCss.transform(item, {}, {}))).toStrictEqual([
      'clamp(1.5rem, 5vw, 2.5rem)',
      'clamp(.5rem, 5vw, 2.5rem)',
    ])
  })

  it('transforms `clamp` tokens with modified ideal value', () => {
    const idealClamp = [
      {
        value: {
          min: '1.5rem',
          ideal: '0.5vw + 0.75rem',
          max: '2.5rem',
        },
        $type: 'clamp',
      },
      {
        value: '',
      },
    ] as TransformedToken[]
    expect(idealClamp.filter(clampCss.filter).map(item => clampCss.transform(item, {}, {}))).toStrictEqual([
      'clamp(1.5rem, 0.5vw + 0.75rem, 2.5rem)',
    ])
  })
})
