// eslint-disable-next-line @typescript-eslint/no-var-requires
import {StyleDictionary} from '../dist/index.js'

describe('index.js', () => {
  it('all formats are attached', () => {
    expect(StyleDictionary.hooks.formats['javascript/esm']).toBeDefined()
    expect(StyleDictionary.hooks.formats['javascript/commonJs']).toBeDefined()
    expect(StyleDictionary.hooks.formats['typescript/esm-declarations']).toBeDefined()
  })
  it('all transformers are attached', () => {
    expect(StyleDictionary.hooks.transforms['clamp/css']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['cubicBezier/css']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['dimension/css']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['typography/css']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['fontFamily/css']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['fontWeight/css']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['gradient/css']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['name/pathToCamelCase']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['name/pathToDotNotation']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['number']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['shadow/css']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['strokeStyle/css']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['transition/css']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['w3c-border/css']).toBeDefined()
    expect(StyleDictionary.hooks.transforms['w3c-color/css']).toBeDefined()
  })

  it('all transformGroups are attached', () => {
    expect(StyleDictionary.hooks.transformGroups['css/extended']).toBeDefined()
  })

  it('all filters are attached', () => {
    expect(StyleDictionary.hooks.filters['isBorder']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isClamp']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isColor']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isCubicBezier']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isDeprecated']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isDimension']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isDuration']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isFontFamily']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isFontWeight']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isGradient']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isNumber']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isShadow']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isSource']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isStrokeStyle']).toBeDefined()
    expect(StyleDictionary.hooks.filters['isTransition']).toBeDefined()
  })
})
