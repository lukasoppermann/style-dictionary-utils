import { TransformedToken } from "style-dictionary/types";
import { cubicBezierCss } from "./cubic-bezier-css";

describe("transform: cubicBezierCss", () => {
  const items = [
    {
      value: "",
      $type: "color",
    },
    {
      value: ["0", "0", "0.5", "1"],
      $type: "cubicBezier",
    },
    {
      value: [0.5, 0, 1, 1],
      $type: "cubicBezier",
    },
    {
      value: "",
    },
  ] as TransformedToken[];

  const w3cItems = [
    {
      $value: "",
      $type: "color",
    },
    {
      $value: ["0", "0", "0.5", "1"],
      $type: "cubicBezier",
    },
    {
      $value: [0.5, 0, 1, 1],
      $type: "cubicBezier",
    },
    {
      $value: "",
    },
  ] as TransformedToken[];

  it("matches `cubicBezier` tokens with an array as a value", () => {
    expect(items.filter(cubicBezierCss.filter)).toStrictEqual([
      items[1],
      items[2],
    ]);
  });

  it("transforms `cubicBezier` array tokens", () => {
    expect(
      items
        .filter(cubicBezierCss.filter)
        .map((item) => cubicBezierCss.transform(item, {}, {}))
    ).toStrictEqual([
      "cubic-bezier(0, 0, 0.5, 1)",
      "cubic-bezier(0.5, 0, 1, 1)",
    ]);
  });

  it("transforms `cubicBezier` array tokens in W3C format", () => {
    expect(
      w3cItems
        .filter(cubicBezierCss.filter)
        .map((item) => cubicBezierCss.transform(item, {}, {}))
    ).toStrictEqual([
      "cubic-bezier(0, 0, 0.5, 1)",
      "cubic-bezier(0.5, 0, 1, 1)",
    ]);
  });
});
