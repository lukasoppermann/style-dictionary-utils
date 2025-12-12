import { StyleDictionary as SD } from "style-dictionary-utils";
import {getIsType} from 'style-dictionary-utils/filter/getIsType.js';

const StyleDictionary = new SD();

const extendSd = await StyleDictionary.extend({
  source: ["./tests/tokens/**/*.json5"],
  platforms: {
    // css: {
    //   buildPath: "./tests/dist/package/css/",
    //   transforms: [
    //     'name/kebab',
    //     'w3c-color/css',
    //     'w3c-border/css',
    //     'dimension/css',
    //     'duration/css',
    //     'cubicBezier/css',
    //     'transition/css',
    //   ],
    //   files: [
    //     {
    //       format: "css/variables",
    //       destination: "variables.css",
    //       filter: getIsType("color"),
    //       options: {
    //         outputReferences: true,
    //       }
    //     },
    //   ],
    // },
    // cssPrefixed: {
    //   prefix: "PREFIX",
    //   buildPath: "./tests/dist/css/",
    //   transformGroup: "css",
    //   files: [
    //     {
    //       format: "css/variables",
    //       destination: "prefix-variables.css",
    //       options: {
    //         outputReferences: true,
    //       }
    //     },
    //   ],
    // },
    cssAdvanced: {
      prefix: "PREFIX",
      buildPath: "./tests/dist/package/css/",
      preprocessors: ["extract-letterSpacing-preprocessor"],
      transforms: [
        'name/kebab',
        'w3c-color/css',
        'w3c-border/css',
        'dimension/css',
        'duration/css',
        'cubicBezier/css',
        'transition/css',
        'fontWeight/css',
        'fontFamily/css',
        'typography/css',
        'gradient/css',
        'shadow/css',
        'strokeStyle/css',
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
