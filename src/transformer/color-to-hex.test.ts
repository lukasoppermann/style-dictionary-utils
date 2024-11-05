import { TransformedToken } from "style-dictionary/types";
import { colorToHex } from "./color-to-hex";

describe("transform: colorToHex", () => {
  it("transforms `color` tokens with hex value", () => {
    expect(
      [{ value: "#343" }, { value: "#343434" }, { value: "#34343466" }].map(
        (item) => colorToHex.transform(item as TransformedToken, {}, {})
      )
    ).toStrictEqual(["#334433", "#343434", "#34343466"]);
  });

  it("transforms `color` tokens with rgb value", () => {
    expect(
      [{ value: "rgb(100,200,255)" }, { value: "rgba(100,200,255, .4)" }].map(
        (item) => colorToHex.transform(item as TransformedToken, {}, {})
      )
    ).toStrictEqual(["#64c8ff", "#64c8ff66"]);
  });

  it("transforms `color` tokens and ignores alpha value", () => {
    expect(
      [
        { value: "#343434", alpha: 0.4 },
        { value: "#34343466", alpha: 0.8 },
        // @ts-expect-error: fake token for test causes error
      ].map((item) => colorToHex.transform(item))
    ).toStrictEqual(["#343434", "#34343466"]);
  });

  it("transforms `named colors` and `transparent` to hex value", () => {
    const input = [{ value: "purple" }, { value: "transparent" }];
    const expectedOutput = ["#800080", "#00000000"];
    expect(
      input.map((item) =>
        colorToHex.transform(item as TransformedToken, {}, {})
      )
    ).toStrictEqual(expectedOutput);
  });

  it("transforms `color` tokens with hex value in W3C format", () => {
    expect(
      [{ $value: "#343" }, { $value: "#343434" }, { $value: "#34343466" }].map(
        (item) => colorToHex.transform(item as TransformedToken, {}, {})
      )
    ).toStrictEqual(["#334433", "#343434", "#34343466"]);
  });
});
