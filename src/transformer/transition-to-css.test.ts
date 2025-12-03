import {TransformedToken} from 'style-dictionary'
import {transitionToCss} from './transition-to-css'

describe('transform: transitionCss', () => {
  const items = [
    {
      value: '',
      $type: 'color',
    },
    {
      value: {
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
    expect(items.filter(transitionToCss.filter)).toStrictEqual([items[1]])
  })

  it('transforms `transition` tokens', () => {
    expect(items.filter(transitionToCss.filter).map(item => transitionToCss.transform(item, {}, {}))).toStrictEqual([
      '200ms 0s cubic-bezier(0.25,0.1,0.25,1)',
    ])
  })

  it('transforms `transition` tokens', () => {
    const item = {
      value: {
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
    expect(transitionToCss.transform(item, {}, {})).toStrictEqual('1s 0s cubic-bezier(0.25,0.1,0.25,1.2)')
  })

  it('transforms invalid duration in `transition` tokens', () => {
    const item = {
      name: 'my.transition',
      value: {
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
    expect(() => transitionToCss.transform(item, {}, {})).toThrowError(
      `Invalid unit when transforming duration: 'my.transition duration' has unit 'sec', expected 'ms' or 's'`,
    )
  })

  it('transforms invalid delay in `transition` tokens', () => {
    const item = {
      name: 'my.transition',
      value: {
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
    expect(() => transitionToCss.transform(item, {}, {})).toThrowError(
      `Invalid unit when transforming duration: 'my.transition delay' has unit 'min', expected 'ms' or 's'`,
    )
  })
})
