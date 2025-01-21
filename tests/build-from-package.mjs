import { StyleDictionary as SD } from "style-dictionary-utils";
import {getIsType} from 'style-dictionary-utils/filter/getIsType.js';

const StyleDictionary = new SD();

const extendSd = await StyleDictionary.extend({
  source: ["./tests/tokens/**/*.json5"],
  platforms: {
    css: {
      buildPath: "./tests/dist/css/",
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
  },
})

extendSd.cleanAllPlatforms();

extendSd.buildAllPlatforms();
