import { TransformedToken } from "style-dictionary/types";

import { colorAlphaToHex } from "./color-alpha-to-hex";

describe("transform: colorAlphaToHex", () => {
  it("transforms `color` tokens with hex value", () => {
    expect(
      [{ value: "#343" }, { value: "#343434" }, { value: "#34343466" }].map(
        (item) => colorAlphaToHex.transform(item as TransformedToken, {}, {})
      )
    ).toStrictEqual(["#334433", "#343434", "#34343466"]);
  });

  it("transforms `color` tokens with rgb value", () => {
    expect(
      [{ value: "rgb(100,200,255)" }, { value: "rgba(100,200,255, .4)" }].map(
        (item) => colorAlphaToHex.transform(item as TransformedToken, {}, {})
      )
    ).toStrictEqual(["#64c8ff", "#64c8ff66"]);
  });

  it("transforms `color` tokens with alpha value", () => {
    expect(
      [
        { value: "#343434", alpha: 0.4 },
        { value: "#34343466", alpha: 0.2 },
        // @ts-expect-error: fake token for test causes error
      ].map((item) => colorAlphaToHex.transform(item, {}))
    ).toStrictEqual(["#34343466", "#34343433"]);
  });

  it("transforms `color` tokens with hex value in W3C format", () => {
    expect(
      [{ $value: "#343" }, { $value: "#343434" }, { $value: "#34343466" }].map(
        (item) => colorAlphaToHex.transform(item as TransformedToken, {}, {})
      )
    ).toStrictEqual(["#334433", "#343434", "#34343466"]);
  });
});
