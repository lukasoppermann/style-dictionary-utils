import { StyleDictionary as SD } from "../dist/index.js";

const StyleDictionary = new SD();
const extendSd = await StyleDictionary.extend({
  source: ["./tests/tokens/*.json5"],
  platforms: {
    css: {
      buildPath: "./tests/dist/css/",
      transformGroup: "css",
      files: [
        {
          format: "css/variables",
          destination: "variables.css",
          options: {
            outputReferences: true,
          }
        },
      ],
    },
    cssPrefixed: {
      prefix: "PREFIX",
      buildPath: "./tests/dist/css/",
      transformGroup: "css",
      files: [
        {
          format: "css/variables",
          destination: "prefix-variables.css",
          options: {
            outputReferences: true,
          }
        },
      ],
    },
    cssAdvanced: {
      prefix: "PREFIX",
      buildPath: "./tests/dist/css/",
      transformGroup: "css",
      files: [
        {
          format: "css/advanced",
          destination: "advanced-variables.css",
          options: {
            outputReferences: true,
          }
        },
      ],
    },
    commonJs: {
      prefix: "PREFIX",
      buildPath: "./tests/dist/js/",
      transformGroup: "js",
      files: [
        {
          format: "javascript/commonJs",
          destination: "commonJs.js",
          options: {
            outputReferences: true,
          }
        },
      ],
    },
    esm: {
      prefix: "PREFIX",
      buildPath: "./tests/dist/js/",
      transformGroup: "js",
      files: [
        {
          format: "javascript/esm",
          destination: "esm.mjs",
          options: {
            outputReferences: true,
          }
        },
      ],
    },
    esmDeclaration: {
      prefix: "PREFIX",
      buildPath: "./tests/dist/js/",
      transformGroup: "js",
      files: [
        {
          format: "typescript/esm-declarations",
          destination: "esm.d.ts",
          options: {
            outputReferences: true,
          }
        },
      ],
    },
  },
})

extendSd.cleanAllPlatforms();

extendSd.buildAllPlatforms();
