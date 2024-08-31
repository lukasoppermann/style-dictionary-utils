import { StyleDictionary as SD } from "../dist/index.js";

const StyleDictionary = new SD();

const addPlatforms = (outdir) => {
  return {
    css: {
      buildPath: `${outdir}/css/`,
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
      buildPath: `${outdir}/css/`,
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
      buildPath: `${outdir}/css/`,
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
      buildPath: `${outdir}/js/`,
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
      buildPath: `${outdir}/js/`,
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
      buildPath: `${outdir}/js/`,
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
    }
  }
}

let extendSd = await StyleDictionary.extend({
  source: ["./tests/tokens/w3c/*.json5"],
  platforms: addPlatforms('./tests/dist/w3c'),
})
extendSd = await StyleDictionary.extend({
  source: ["./tests/tokens/non-w3c/*.json5"],
  platforms: addPlatforms('./tests/dist/non-w3c'),
})

extendSd.cleanAllPlatforms();

extendSd.buildAllPlatforms();
