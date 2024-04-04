import StyleDictionary from "style-dictionary";
import { variablesCss } from "../../src/transformer/variables-css";

describe("Transformer: variablesCss", () => {
  const items = [
    {
      name: "red",
      value: "#ff0000",
    },
    {
      name: "white",
      value: "#ffffff",
    },
  ] as StyleDictionary.TransformedToken[];

  const options = {
    cssVarPrefix: "PREFIX",
    withValueFallback: true,
  };

  it("transforms names to CSS variable notation", () => {
    expect(
      items.map((item) => variablesCss.transformer(item, {}))
    ).toStrictEqual(["var(--red)", "var(--white)"]);
  });

  it("adds prefix to CSS variable notation", () => {
    expect(
      items.map((item) => variablesCss.transformer(item, options))
    ).toStrictEqual([
      "var(--PREFIX-red, #ff0000)",
      "var(--PREFIX-white, #ffffff)",
    ]);
  });
});
