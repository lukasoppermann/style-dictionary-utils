import { TransformedToken } from "style-dictionary/types";
import { fontFamilyCss } from "./font-family-css";

describe("transform: fontFamily", () => {
  const items = [
    {
      value: "Helvetica",
      $type: "fontFamily",
    },
    {
      value: ["helvetica", "sans-serif", "Helvetica Neue"],
      $type: "fontFamily",
    },
    {
      value: "",
    },
    {
      value: "",
      $type: "color",
    },
  ] as TransformedToken[];

  const w3cItems = [
    {
      $value: "Helvetica",
      $type: "fontFamily",
    },
    {
      $value: ["helvetica", "sans-serif", "Helvetica Neue"],
      $type: "fontFamily",
    },
    {
      $value: "",
    },
    {
      $value: "",
      $type: "color",
    },
  ] as TransformedToken[];

  it("matches `fontFamily` tokens with an array as a value", () => {
    expect(items.filter(fontFamilyCss.filter)).toStrictEqual([items[1]]);
  });

  it("transforms `fontFamily` array tokens", () => {
    expect(
      items
        .filter(fontFamilyCss.filter)
        .map((item) => fontFamilyCss.transform(item, {}, {}))
    ).toStrictEqual(["helvetica, sans-serif, 'Helvetica Neue'"]);
  });

  it("transforms `fontFamily` array tokens in W3C format", () => {
    expect(
      w3cItems
        .filter(fontFamilyCss.filter)
        .map((item) => fontFamilyCss.transform(item, {}, {}))
    ).toStrictEqual(["helvetica, sans-serif, 'Helvetica Neue'"]);
  });
});
