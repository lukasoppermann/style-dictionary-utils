import { TransformedToken } from "style-dictionary/types";
import { isClamp } from "./isClamp";

describe("Filter: isClamp", () => {
  const items = [
    {
      value: "300ms",
      $type: "clamp",
    },
    {
      value: {
        test: "2rem",
      },
      $type: "clamp",
    },
    {
      value: {
        min: "2rem",
      },
      type: "clamp",
    },
    {
      value: "string",
    },
    {
      value: {
        min: "2rem",
        ideal: "3rem",
        max: "3rem",
      },
      type: "clamp",
    },
    {
      value: {
        min: "2rem",
        ideal: "3rem",
        max: "3rem",
      },
      type: "dimension",
    },
  ] as TransformedToken[];

  const w3cItems = [
    {
      $value: "300ms",
      $type: "clamp",
    },
    {
      $value: {
        test: "2rem",
      },
      $type: "clamp",
    },
    {
      $value: {
        min: "2rem",
      },
      type: "clamp",
    },
    {
      $value: "string",
    },
    {
      $value: {
        min: "2rem",
        ideal: "3rem",
        max: "3rem",
      },
      type: "clamp",
    },
    {
      $value: {
        min: "2rem",
        ideal: "3rem",
        max: "3rem",
      },
      type: "dimension",
    },
  ] as TransformedToken[];
  it("filters clamp tokens", () => {
    expect(items.filter(isClamp)).toStrictEqual([items[4]]);
  });

  it("filters clamp tokens in W3C format", () => {
    expect(w3cItems.filter(isClamp)).toStrictEqual([w3cItems[4]]);
  });
});
