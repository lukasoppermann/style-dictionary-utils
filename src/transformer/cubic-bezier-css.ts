import { Transform, TransformedToken } from "style-dictionary/types";
import { isCubicBezier } from "../filter/isCubicBezier.js";
import { getValue } from "../utilities/getValue.js";

type TokenCubicBezier = [x1: number, y1: number, x2: number, y2: number];

export const cubicBezierCss: Transform = {
  name: "cubicBezier/css",
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken) =>
    isCubicBezier(token) && Array.isArray(getValue(token)),
  transform: ({
    value,
    $value,
  }: Omit<TransformedToken, "value"> & { value?: TokenCubicBezier }) => {
    if (!(value ?? $value)) return;
    const [x1, y1, x2, y2] = value ?? $value;
    return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
  },
};
