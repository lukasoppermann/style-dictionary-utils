import { TransformedToken } from "style-dictionary/types";
import { fontWeightToNumber } from "./font-weight-to-number";

describe("transform: fontWeight", () => {
  const items = [
    {
      value: 300,
      $type: "fontWeight",
    },
    {
      value: "light",
      $type: "fontWeight",
    },
    {
      value: "300",
      $type: "fontWeight",
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
      $value: 300,
      $type: "fontWeight",
    },
    {
      $value: "light",
      $type: "fontWeight",
    },
    {
      $value: "300",
      $type: "fontWeight",
    },
    {
      $value: "",
    },
    {
      $value: "",
      $type: "color",
    },
  ] as TransformedToken[];

  it("matches `fontWeight` tokens with a string value", () => {
    expect(items.filter(fontWeightToNumber.filter)).toStrictEqual([
      items[1],
      items[2],
    ]);
  });

  it("transforms `fontWeight` string to number", () => {
    expect(
      items
        .filter(fontWeightToNumber.filter)
        .map((item) => fontWeightToNumber.transform(item, {}, {}))
    ).toStrictEqual([300, 300]);
  });

  it("transforms `fontWeight` string to number in W3C format", () => {
    expect(
      w3cItems
        .filter(fontWeightToNumber.filter)
        .map((item) => fontWeightToNumber.transform(item, {}, {}))
    ).toStrictEqual([300, 300]);
  });
});
