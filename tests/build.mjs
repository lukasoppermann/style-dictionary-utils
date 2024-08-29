import { StyleDictionary as SD } from "style-dictionary-utils";

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
        },
      ],
    },
  },
})

extendSd.cleanAllPlatforms();

extendSd.buildAllPlatforms();
