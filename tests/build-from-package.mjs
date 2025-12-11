import { StyleDictionary as SD } from "style-dictionary-utils";
import {getIsType} from 'style-dictionary-utils/filter/getIsType.js';

const StyleDictionary = new SD();

const outdir = './tests/dist/package/';

const extendSd = await StyleDictionary.extend({
  source: ["./tests/tokens/**/*.json5"],
  platforms: {
    css: {
      buildPath: `${outdir}/css/`,
      transformGroup: "css",
      files: [
        {
          format: "css/variables",
          destination: "variables.css",
          filter: getIsType("color"),
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
      transforms: [
        "name/kebab",
        "color/rgbAlpha",
        "border/css"
      ],
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
  },
})

extendSd.cleanAllPlatforms();

extendSd.buildAllPlatforms();
