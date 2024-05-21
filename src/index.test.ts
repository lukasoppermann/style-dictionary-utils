import StyleDictionary from '../src/index';

describe('index.ts', () => {

  it('has json parser', () => {
    expect(StyleDictionary.parsers[0]).toEqual({
      "parse": expect.any(Function),
      "pattern": /\.json$|\.tokens\.json$|\.tokens$/,
    })
  })

  it('all formats are attached', () => {
    expect(StyleDictionary.format['javascript/esm']).toBeDefined()
    expect(StyleDictionary.format['javascript/commonJs']).toBeDefined()
    expect(StyleDictionary.format["typescript/esm-declarations"]).toBeDefined();
  })

  it('all transformers are attached', () => {
    expect(StyleDictionary.transform['color/hex']).toBeDefined()
    expect(StyleDictionary.transform['color/rgba']).toBeDefined()
    expect(StyleDictionary.transform['color/rgbAlpha']).toBeDefined()
    expect(StyleDictionary.transform['color/rgbaFloat']).toBeDefined()
    expect(StyleDictionary.transform['color/hexAlpha']).toBeDefined()
    expect(StyleDictionary.transform["clamp/css"]).toBeDefined();
    expect(StyleDictionary.transform['name/pathToDotNotation']).toBeDefined()
    expect(StyleDictionary.transform['name/pathToCamelCase']).toBeDefined()
    expect(StyleDictionary.transform['shadow/css']).toBeDefined()
    expect(StyleDictionary.transform['font/css']).toBeDefined()
    expect(StyleDictionary.transform['fontFamily/css']).toBeDefined()
    expect(StyleDictionary.transform['fontWeight/number']).toBeDefined()
    expect(StyleDictionary.transform['gradient/css']).toBeDefined()
    expect(StyleDictionary.transform['cubicBezier/css']).toBeDefined()
    expect(StyleDictionary.transform['dimension/pixelToRem']).toBeDefined()
    expect(StyleDictionary.transform['dimension/remToPixel']).toBeDefined()
    expect(StyleDictionary.transform["dimension/pixelUnitless"]).toBeDefined();
  })

  it('all transformGroups are attached', () => {
    expect(StyleDictionary.transformGroup['css/extended']).toBeDefined()
  })

  it('all filters are attached',() => {
    expect(StyleDictionary.filter['isBorder']).toBeDefined()
    expect(StyleDictionary.filter['isColor']).toBeDefined()
    expect(StyleDictionary.filter['isColorOrGradient']).toBeDefined()
    expect(StyleDictionary.filter['isCubicBezier']).toBeDefined()
    expect(StyleDictionary.filter["isClamp"]).toBeDefined();
    expect(StyleDictionary.filter['isDimension']).toBeDefined()
    expect(StyleDictionary.filter['isDuration']).toBeDefined()
    expect(StyleDictionary.filter['isFontFamily']).toBeDefined()
    expect(StyleDictionary.filter['isFontWeight']).toBeDefined()
    expect(StyleDictionary.filter['isGradient']).toBeDefined()
    expect(StyleDictionary.filter['isShadow']).toBeDefined()
    expect(StyleDictionary.filter['isSource']).toBeDefined()
    expect(StyleDictionary.filter['isStrokeStyle']).toBeDefined()
    expect(StyleDictionary.filter['isTransition']).toBeDefined()
    expect(StyleDictionary.filter['isTypographic']).toBeDefined()
    expect(StyleDictionary.filter['isTypography']).toBeDefined()
  })

  it('can be extended with a format', () => {
    StyleDictionary.registerFormat({
      name: 'format/test',
      formatter: () => 'test'
    })
    expect(StyleDictionary.format['format/test']).toEqual(expect.any(Function))
  })

  it('can be extended with a transform', () => {
    StyleDictionary.registerTransform({
      name: 'transform/test',
      type: `value`,
      transitive: true,
      transformer: () => 'test'
    })
    expect(StyleDictionary.transform['transform/test']).toEqual({ "matcher": undefined, "transformer": expect.any(Function), "transitive": true, "type": "value" })
  })

  it('can be extended with a filter', () => {
    StyleDictionary.registerFilter({
      name: 'filter/test',
      matcher: () => true
    })
    expect(StyleDictionary.filter['filter/test']).toEqual(expect.any(Function))
  })

  it('can be extended with a parser', () => {
    StyleDictionary.registerParser({
      pattern: /\.json$/,
      // @ts-expect-error: not a valid token
      parse: () => ['test']
    })

    expect(StyleDictionary.parsers[1]).toEqual({
      "parse": expect.any(Function),
      "pattern": /\.json$/,
    })
  })

})