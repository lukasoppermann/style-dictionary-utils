import {StyleDictionary as SD} from '../src/index'

describe('index.ts', () => {
  const StyleDictionary = new SD()

  it('all formats are attached', () => {
    expect(StyleDictionary.hooks.formats['javascript/esm']).toBeDefined()
    expect(StyleDictionary.hooks.formats['javascript/commonJs']).toBeDefined()
    expect(StyleDictionary.hooks.formats['typescript/esm-declarations']).toBeDefined()
  })

  it('all transformers are attached', () => {
    expect(StyleDictionary.hooks.transforms['color/hex']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['color/rgba']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['color/rgbAlpha']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['color/rgbaFloat']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['color/hexAlpha']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['comment/deprecated']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['clamp/css']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['name/pathToDotNotation']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['name/pathToCamelCase']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['shadow/css']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['font/css']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['fontFamily/css']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['fontWeight/number']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['gradient/css']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['cubicBezier/css']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['dimension/pixelToRem']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['dimension/remToPixel']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['dimension/pixelUnitless']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['duration/toCss']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['number']).toBeDefined()
  })

  it('all transformGroups are attached', () => {
    expect(StyleDictionary.hooks.transformGroups['css/extended']).toBeDefined()
  })

  it('all filters are attached', () => {
    expect(StyleDictionary.hooks.filters['isBorder']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isColor']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isColorOrGradient']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isCubicBezier']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isClamp']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isDeprecated']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isDimension']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isDuration']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isFontFamily']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isFontWeight']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isGradient']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isShadow']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isSource']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isStrokeStyle']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isTransition']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isTypographic']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isTypography']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isNumber']).toBeDefined()
  })

  it('can be extended with a format', () => {
    StyleDictionary.registerFormat({
      name: 'format/test',
      format: () => 'test',
    })
    expect(StyleDictionary.hooks.formats['format/test']).toEqual(expect.any(Function))
  })

  it('can be extended with a transform', () => {
    StyleDictionary.registerTransform({
      name: 'transform/test',
      type: `value`,
      transitive: true,
      transform: () => 'test',
    })
    expect(StyleDictionary.hooks.transforms['transform/test']).toEqual({
      filter: undefined,
      transform: expect.any(Function),
      transitive: true,
      type: 'value',
    })
  })

  it('can be extended with a filter', () => {
    StyleDictionary.registerFilter({
      name: 'filter/test',
      filter: () => true,
    })
    expect(StyleDictionary.hooks.filters['filter/test']).toEqual(expect.any(Function))
  })

  it('can be extended with a parser', () => {
    StyleDictionary.registerParser({
      name: 'parser/test',
      pattern: /\.json$/,
      // @ts-expect-error: not a valid token
      parser: () => ['test'],
    })

    expect(StyleDictionary.hooks.parsers['parser/test']).toEqual({
      parser: expect.any(Function),
      pattern: /\.json$/,
    })
  })
})
