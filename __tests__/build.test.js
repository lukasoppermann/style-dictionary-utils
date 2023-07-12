// eslint-disable-next-line @typescript-eslint/no-var-requires
const StyleDictionary = require("../dist");

describe('index.js', () => {  
  it("all formats are attached", () => {
    expect(StyleDictionary.format["javascript/esm"]).toBeDefined();
    expect(StyleDictionary.format["javascript/commonJs"]).toBeDefined();
  });
  it("all transformers are attached", () => {
    expect(StyleDictionary.transform["color/hex"]).toBeDefined();
    expect(StyleDictionary.transform["color/rgba"]).toBeDefined();
    expect(StyleDictionary.transform["color/rgbAlpha"]).toBeDefined();
    expect(StyleDictionary.transform["color/rgbaFloat"]).toBeDefined();
    expect(StyleDictionary.transform["color/hexAlpha"]).toBeDefined();
    expect(StyleDictionary.transform["name/pathToDotNotation"]).toBeDefined();
    expect(StyleDictionary.transform["shadow/css"]).toBeDefined();
    expect(StyleDictionary.transform["font/css"]).toBeDefined();
    expect(StyleDictionary.transform["fontFamily/css"]).toBeDefined();
    expect(StyleDictionary.transform["fontWeight/number"]).toBeDefined();
    expect(StyleDictionary.transform["gradient/css"]).toBeDefined();
    expect(StyleDictionary.transform["cubicBezier/css"]).toBeDefined();
    expect(StyleDictionary.transform["dimension/pixelToRem"]).toBeDefined();
    expect(StyleDictionary.transform["dimension/remToPixel"]).toBeDefined();
    expect(StyleDictionary.transform["dimension/pixelUnitless"]).toBeDefined();
  });

  it("all transformGroups are attached", () => {
    expect(StyleDictionary.transformGroup["css/extended"]).toBeDefined();
  })

  it("all filters are attached", () => {
    expect(StyleDictionary.filter["isBorder"]).toBeDefined();
    expect(StyleDictionary.filter["isColor"]).toBeDefined();
    expect(StyleDictionary.filter["isColorOrGradient"]).toBeDefined();
    expect(StyleDictionary.filter["isCubicBezier"]).toBeDefined();
    expect(StyleDictionary.filter["isDimension"]).toBeDefined();
    expect(StyleDictionary.filter["isDuration"]).toBeDefined();
    expect(StyleDictionary.filter["isFontFamily"]).toBeDefined();
    expect(StyleDictionary.filter["isFontWeight"]).toBeDefined();
    expect(StyleDictionary.filter["isGradient"]).toBeDefined();
    expect(StyleDictionary.filter["isShadow"]).toBeDefined();
    expect(StyleDictionary.filter["isSource"]).toBeDefined();
    expect(StyleDictionary.filter["isStrokeStyle"]).toBeDefined();
    expect(StyleDictionary.filter["isTransition"]).toBeDefined();
    expect(StyleDictionary.filter["isTypographic"]).toBeDefined();
    expect(StyleDictionary.filter["isTypography"]).toBeDefined();
  });
})