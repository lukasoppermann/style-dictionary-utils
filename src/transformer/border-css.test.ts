import { TransformedToken } from "style-dictionary";
import { borderCss } from "./border-css";

describe("transform: border", () => {
  const items = [
    {
      value: {
        color: "#334455",
        width: "1px",
        style: "dashed",
      },
      $type: "border",
    },
    {
      value: {
        color: "#33445566",
        width: "5px",
        style: "solid",
      },
      $type: "border",
    },
  ];

  const w3cItems = [
    {
      $value: {
        color: "#334455",
        width: "1px",
        style: "dashed",
      },
      $type: "border",
    },
    {
      $value: {
        color: "#33445566",
        width: "5px",
        style: "solid",
      },
      $type: "border",
    },
  ];

  it("transforms `border` tokens", () => {
    // @ts-expect-error: because it is not a real token
    expect(
      items.map((item) => borderCss.transform(item as TransformedToken))
    ).toStrictEqual(["1px dashed #334455", "5px solid #33445566"]);
  });

  it("transforms `border` tokens in W3C format", () => {
    // @ts-expect-error: because it is not a real token
    expect(
      w3cItems.map((item) => borderCss.transform(item as TransformedToken))
    ).toStrictEqual(["1px dashed #334455", "5px solid #33445566"]);
  });
});
