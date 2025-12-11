import { StyleDictionary as SD } from "../dist/index.js";

const MySD = new SD({
  log: {
    warnings: "warn", // 'warn' | 'error' | 'disabled'
    verbosity: "verbose", // 'default' | 'silent' | 'verbose'
    errors: {
      brokenReferences: "throw", // 'throw' | 'console'
    },
  },
});

const addPlatforms = (outdir) => {
  return {
    cssAdvanced: {
      prefix: "PREFIX",
      buildPath: `${outdir}/css/`,
      // transformGroup: "css/extended",
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
        'letterspacing/css',
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
    // commonJs: {
    //   prefix: "PREFIX",
    //   buildPath: `${outdir}/js/`,
    //   transformGroup: "js",
    //   files: [
    //     {
    //       format: "javascript/commonJs",
    //       destination: "commonJs.js",
    //       options: {
    //         outputReferences: true,
    //       }
    //     },
    //   ],
    // },
    // esm: {
    //   prefix: "PREFIX",
    //   buildPath: `${outdir}/js/`,
    //   transformGroup: "js",
    //   files: [
    //     {
    //       format: "javascript/esm",
    //       destination: "esm.mjs",
    //       options: {
    //         outputReferences: true,
    //       }
    //     },
    //   ],
    // },
    // esmDeclaration: {
    //   prefix: "PREFIX",
    //   buildPath: `${outdir}/js/`,
    //   transformGroup: "js",
    //   files: [
    //     {
    //       format: "typescript/esm-declarations",
    //       destination: "esm.d.ts",
    //       options: {
    //         outputReferences: true,
    //       }
    //     },
    //   ],
    // }
  }
}

let extendSd = await MySD.extend({
  source: ["./tests/tokens/*.json5"],
  platforms: addPlatforms('./tests/dist/local'),
})

await extendSd.cleanAllPlatforms();

await extendSd.buildAllPlatforms();
