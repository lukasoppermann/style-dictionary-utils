import {TransformedToken} from 'style-dictionary'
import {transitionCss} from './transition-css'

describe('transform: transitionCss', () => {
  const items = [
    {
      $value: '',
      $type: 'color',
    },
    {
      $value: {
        duration: {
          value: 200,
          unit: 'ms',
        },
        delay: {
          value: 0,
          unit: 'ms',
        },
        timingFunction: [0.25, 0.1, 0.25, 1.0],
      },
      $type: 'transition',
    },
  ] as TransformedToken[]

  it('matches `transition` tokens', () => {
    expect(items.filter(transitionCss.filter)).toStrictEqual([items[1]])
  })

  it('transforms `transition` tokens', () => {
    expect(items.filter(transitionCss.filter).map(item => transitionCss.transform(item, {}, {}))).toStrictEqual([
      '200ms 0s cubic-bezier(0.25, 0.1, 0.25, 1)',
    ])
  })

  it('transforms `transition` tokens with s duration', () => {
    const item = {
      $value: {
        duration: {
          value: 1,
          unit: 's',
        },
        delay: {
          value: 0,
          unit: 'ms',
        },
        timingFunction: [0.25, 0.1, 0.25, 1.2],
      },
      $type: 'transition',
    } as TransformedToken
    expect(transitionCss.transform(item, {}, {})).toStrictEqual('1s 0s cubic-bezier(0.25, 0.1, 0.25, 1.2)')
  })

  it('transforms invalid duration in `transition` tokens', () => {
    const item = {
      name: 'my.transition',
      $value: {
        duration: {
          value: 1,
          unit: 'sec',
        },
        delay: {
          value: 0,
          unit: 's',
        },
        timingFunction: [0.25, 0.1, 0.25, 1.2],
      },
      $type: 'transition',
    } as TransformedToken
    expect(() => transitionCss.transform(item, {}, {})).toThrowError(
      `Error transforming transition token 'my.transition': Error: Invalid unit: 'sec', expected 'ms' or 's'`,
    )
  })

  it('transforms invalid delay in `transition` tokens', () => {
    const item = {
      name: 'my.transition',
      $value: {
        duration: {
          value: 1,
          unit: 's',
        },
        delay: {
          value: 0,
          unit: 'min',
        },
        timingFunction: [0.25, 0.1, 0.25, 1.2],
      },
      $type: 'transition',
    } as TransformedToken
    expect(() => transitionCss.transform(item, {}, {})).toThrowError(
      `Error transforming transition token 'my.transition': Error: Invalid unit: 'min', expected 'ms' or 's'`,
    )
  })
})
