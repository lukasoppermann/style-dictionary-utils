/**
 * jsonToTypes
 * @description creates a typescript type definition from a json object
 * @param json json object
 * @param indent indentation string
 * @param rootName name of the root type
 * @param isRoot is the root type
 * @returns typescript type definition
 */
export const jsonToTypes = (
  json: object,
  indent = "  ",
  rootName = "DesignToken",
  isRoot = true
) => {
  // is non-object value
  if (!json || typeof json !== "object") return json;

  let result = isRoot ? `export type ${rootName} = {\n` : "{\n";

  Object.entries(json).forEach(([key, value]) => {
    result += `${indent}'${key}': `;
    if (typeof value === "object" && value !== null) {
      result += jsonToTypes(value, `${indent}  `, rootName, false);
    } else {
      result += `${typeof value};\n`;
    }
  });

  result += `${indent.slice(0, -2)}};\n`;
  return result;
};
