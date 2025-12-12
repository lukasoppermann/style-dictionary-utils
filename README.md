# Style dictionary utils

[![npm](https://img.shields.io/npm/v/style-dictionary-utils?color=red)](https://www.npmjs.com/package/style-dictionary-utils)
[![GitHub release (release name instead of tag name)](https://img.shields.io/github/v/release/lukasoppermann/style-dictionary-utils)](https://github.com/lukasoppermann/style-dictionary-utils/releases)

`style-dictionary-utils` is a collection of `filters`, `transformers` and `formats` for [Style Dictionary](https://styledictionary.com/) that make working with [w3c design tokens](https://github.com/design-tokens/community-group) a lot easier.

## Installation

Install the `style-dictionary-utils` as well as `style-dictionary`.

```bash
npm i -D style-dictionary-utils style-dictionary
```

## How to use style dictionary version 3?

If you are not ready to upgrade to style dictinary version 3 you can continue using `style-dictionary-utils` by locking to `v2` currently [`v2.4.1`](https://github.com/lukasoppermann/style-dictionary-utils/tree/v2.4.1) version.

## Getting started

The easiest way to use `style-dictionary-utils` is to import the prepared `StyleDictionary` object into your build file:

```js
// build.ts
import {StyleDictionary} from 'style-dictionary-utils'

const myStyleDictionary = new StyleDictionary()

// when using style dictionary 4 you whave to await the extend method
const extendedSd = await myStyleDictionary.extend({
  platforms: {
    ts: {
      transforms: ['color/css', 'shadow/css'],
      files: [
        {
          filter: 'isSource',
          destination: 'tokens.ts',
          format: 'javascript/esm',
        },
      ],
    },
  },
})

extendedSd.buildAllPlatforms()
```

Now all the included utilities<sup>\*</sup> are available to you via the keys mentioned in the docs below.

## Extending style dictionary

You can still extend style dictionary with your own transformers and formats like before.
The only difference is that you must use the `StyleDictionary` object that you import from `style-dictionary-utils`.

```js
// build.ts
import { StyleDictionary } from 'style-dictionary-utils'

StyleDictionary.registerTransform({
  name: 'transform/pxToRem',
  $type: `value`,
  transitive: true,
  transform: () => // ...
})
```

[Look at the tests](./tests/build.mjs) to get an idea how it works.

## Included utilities

- Formats
  - [css/advanced](#cssadvanced)
  - [javascript/esm](#javascriptesm)
  - [typescript/esm-declarations](#typescriptesm-declarations)
  - [javascript/commonJs](#javascriptcommonjs)
- Transformers
  - [name/pathToDotNotation](#namepathtodotnotation)
  - [name/pathToCamelCase](#namepathtocamelcase)
  - [name/pathToPascalCase](#namepathtopascalcase)
  - [color/css](#colorcss)
  - [typography/css](#typographycss)
  - [fontFamily/css](#fontfamilycss)
  - [fontWeight/number](#fontweightnumber)
  - [gradient/css](#gradientcss)
  - [cubicBezier/css](#cubicbeziercss)
  - [dimension/css](#dimension)
  - [clamp/css](#clampcss)
  - [shadow/css](#shadowcss)
  - [number](#number)
- Filters
  - [isSource](#issource)
  - [isColor](#iscolor)
  - [isGradient](#isgradient)
  - [isTypography](#istypography)
  - [isTransition](#istransition)
  - [isStrokeStyle](#isstrokestyle)
  - [isShadow](#isshadow)
  - [isFontWeight](#isfontweight)
  - [isFontFamily](#isfontfamily)
  - [isDuration](#isduration)
  - [isDimension](#isdimension)
  - [isCubicBezier](#iscubicbezier)
  - [isBorder](#isborder)
  - [isClamp](#isclamp)
  - [isNumber](#isnumber)
- Special Filter
  - [getHasAttribute](#gethasattribute)
  - [getHasAttributeValue](#gethasattributevalue)
  - [getIsType](#getisyype)

## 📑 Formats

### css/advanced

The `css/advanced` format exports a token dictionary as a `css` file with css variables. It allows you to define media queries that can wrap specific parts of your css variables. If nothing is defined the entire file will be wrapped in a `:root` selector.

You can change the selector by defining it in `file.options.selector`.

You can define rules on a file level using `file.options.rules`. If one or more rules are defined, only tokens within any of the rules will be output. You can define as many rule objects within `file.options.rules` as you want. Tokens can be part of one or multiple rules.

A rule object may have any or all of the three properties `atRule`, `selector` and `matcher`.

- `selector` is a string that is wrapped around your css. If the `selector` is undefined, the default selector or one define at `file.options.selector` will be used. If you don't want a selector, set it to `false`.
- `atRule` can be a string or array of strings, that are wrapped around the css and `selector` with the first being the outer layer.
- `matcher` is a filter function that returns true for tokens that should be included in the query. If you want to match all tokens, just return true from the matcher.

```css
body[theme='dark'] {
  --color-background-primary: #ff0000;
  --color-background-secondary: #0000ff;
}
@media (min-width: 768px) {
  body[theme='dark'] {
    --color-button-primary: #c1c1c1;
    --color-button-secondary: #007d79;
  }
}
```

##### Usage

```js
myStyleDictionary.extend({
  "platforms": {
    "css": {
      "transforms": //...,
      "files": [{
        // ...
        "format": "css/advanced",
        "options": {
          selector: `body[theme="dark"]`, // defaults to :root; set to false to disable
          rules: [
          {
            atRule: '@media (min-width: 768px)',
            selector: `body[size="medium"]` // this will be used instead of body[theme="dark"]`
            matcher: (token: StyleDictionary.TransformedToken) => token.filePath.includes('tablet'), // tokens that match this filter will be added inside the media query
          }]
        }
      }]
    }
  }
});
```

### javascript/esm

The `javascript/esm` format exports a token dictionary as an `es6 export` statement.

```js
export default {
  colors: {
    primary: '#0D70E6',
  },
}
```

##### Usage

```js
myStyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        // ...
        "format": "javascript/esm",
      }]
    }
  }
});
```

### typescript/esm-declarations

The `typescript/esm-declarations` format exports a token dictionary as a `typescript` declaration file.

```js
export default {
  colors: {
    primary: string,
  },
}
```

##### Usage

```js
myStyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        // ...
        "format": "typescript/esm-declarations",
      }]
    }
  }
});
```

### javascript/commonJs

The `javascript/commonJs` format exports a token dictionary as an `commonJs module`.

```js
exports.default = {
  colors: {
    primary: '#0D70E6',
  },
}
```

##### Usage

```js
myStyleDictionary.extend({
  "platforms": {
    "js": {
      "transforms": //...,
      "files": [{
        // ...
        "format": "javascript/commonJs",
      }]
    }
  }
});
```

## 🤖 Transformers

Transforms change the `value` or `name` of a token.
You can use transforms by refering the name in the array value of the [`transforms`](https://amzn.github.io/style-dictionary/#/transforms)property of a [`platform`](https://amzn.github.io/style-dictionary/#/config?id=platform).

### Transform group

If you want to use the same `transformers` multiple times you can create a [`transform group`](https://amzn.github.io/style-dictionary/#/api?id=registertransformgroup) for easy reference.

```js
myStyleDictionary.registerTransformGroup({
  name: 'webHex',
  transforms: ['color/css', 'dimension/css', 'typography/css'],
})
```

#### `css/extended` transform group

This packages ships a predefined transform group, called `css/extended`.
It includes all transforms from the original [`css` transform group](https://amzn.github.io/style-dictionary/#/transform_groups?id=css) as well as the following transforms: `color/css`, `shadow/css`, `typography/css`, `fontFamily/css`, `fontWeight/number`, `name/pathToDotNotation`, `cubicBezier/css`, `border/css`.

You can use it like any other transform Group:

```js
myStyleDictionary.extend({
  platforms: {
    css: {
      transformGroup: 'css/extended',
      files: [
        {
          // ...
        },
      ],
    },
  },
})
```

### color/css

This `value` transformer converts a w3c color token with a `$type` of `color` to a CSS color value. By default, it outputs colors in `hex` format, but you can control the output format using the `colorOutputFormat` platform option.

**Supported output formats:** `hex`, `rgb`, `rgba`, `hsl`, `hsla`, `rgbFloat`

```js
myStyleDictionary.extend({
  platforms: {
    css: {
      transforms: ['color/css'],
      colorOutputFormat: 'hsl', // optional: defaults to 'hex'
      files: [
        {
          // ...
        },
      ],
    },
  },
})
```

##### Before transformation

```js
{
  color: {
    primary: {
      value: {
        colorSpace: "srgb",
        components: [0.051, 0.439, 0.902],
        alpha: 1
      },
      $type: "color"
    }
  }
}
```

##### After transformation (hex format)

```js
{
  color: {
    primary: {
      value: "#0d70e6",
      $type: "color"
    }
  }
}
```

### shadow/css

This `value` transformer converts a w3c shadow token with a `$type` of `shadow` to a CSS shadow value. It supports both single shadows and multiple shadows (box-shadow).

```js
myStyleDictionary.extend({
  platforms: {
    css: {
      transforms: ['shadow/css'],
      files: [
        {
          // ...
        },
      ],
    },
  },
})
```

##### Before transformation

```js
{
  shadow: {
    card: {
      value: {
        offsetX: {value: 0, unit: "px"},
        offsetY: {value: 4, unit: "px"},
        blur: {value: 8, unit: "px"},
        spread: {value: 0, unit: "px"},
        color: {
          colorSpace: "srgb",
          components: [0, 0, 0],
          alpha: 0.1
        }
      },
      $type: "shadow"
    }
  }
}
```

##### After transformation

```js
{
  shadow: {
    card: {
      value: "0px 4px 8px 0px #0000001a",
      $type: "shadow"
    }
  }
}
```

### dimension/css

This `value` transformer converts a w3c dimension token with a `$type` of `dimension` to a CSS dimension value. It can convert between `px` and `rem` units based on platform options.

**Platform options:**

- `outputUnit`: Target unit (`px` or `rem`, defaults to token's original unit)
- `basePxFontSize`: Base font size for px/rem conversion (defaults to `16`)
- `appendUnit`: Whether to append the unit to the output (defaults to `true`)

```js
myStyleDictionary.extend({
  platforms: {
    css: {
      transforms: ['dimension/css'],
      basePxFontSize: 16, // optional: base font size for rem conversion
      outputUnit: 'rem', // optional: 'px' or 'rem'
      files: [
        {
          // ...
        },
      ],
    },
  },
})
```

##### Before transformation

```js
{
  spacing: {
    medium: {
      value: {
        value: 16,
        unit: "px"
      },
      $type: "dimension"
    }
  }
}
```

##### After transformation (with outputUnit: 'rem')

```js
{
  spacing: {
    medium: {
      value: "1rem",
      $type: "dimension"
    }
  }
}
```

### name/pathToDotNotation

This `name` transformer replaces the token name with the entire path of the token in dot.notation.
This is especially useful for flat `.js` or `.json` files.

To use it simply add `name/pathToDotNotation` to the `transforms` array.

```js
myStyleDictionary.extend({
  platforms: {
    ts: {
      transforms: ['name/pathToDotNotation'],
      files: [
        {
          // ...
        },
      ],
    },
  },
})
```

##### Before transformation

```js
{
  colors: {
    red: {
      100: {
        // ...
      }
    }
  }
}
```

##### After transformation

```js
{
  "colors.red.100": {
    // ...
  }
}
```

### name/pathToCamelCase

This `name` transformer replaces the token name with the entire path of the token in camelCase notation.

To use it simply add `name/pathToCamelCase` to the `transforms` array.

```js
myStyleDictionary.extend({
  platforms: {
    ts: {
      transforms: ['name/pathToCamelCase'],
      files: [
        {
          // ...
        },
      ],
    },
  },
})
```

##### Before transformation

```js
{
  colors: {
    bg: {
      default: {
        // ...
      }
    }
  }
}
```

##### After transformation

```js
{
  "colorsBgDefault": {
    // ...
  }
}
```

### name/pathToPascalCase

This `name` transformer replaces the token name with the entire path of the token in camelCase notation.

To use it simply add `name/pathToPascalCase` to the `transforms` array.

```js
myStyleDictionary.extend({
  platforms: {
    ts: {
      transforms: ['name/pathToPascalCase'],
      files: [
        {
          // ...
        },
      ],
    },
  },
})
```

##### Before transformation

```js
{
  colors: {
    bg: {
      default: {
        // ...
      }
    }
  }
}
```

##### After transformation

```js
{
  "ColorsBgDefault": {
    // ...
  }
}
```

### typography/css

This `value` transformer replaces the value of a w3c typography token with a `$type` of `typography` with a `css` font string.

```js
myStyleDictionary.extend({
  platforms: {
    ts: {
      transforms: ['typography/css'],
      files: [
        {
          // ...
        },
      ],
    },
  },
})
```

##### Before transformation

```js
{
  typography: {
    body: {
      value: {
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "22px",
        fontFamily: "Helvetica",
        fontStyle: "italic"
      },
      $type: "typography"
    }
  }
}
```

##### After transformation

```js
{
  typography: {
    body: {
      value: "italic 500 16px/22px Helvetica",
      $type: "typography"
    }
  }
}
```

### fontFamily/css

This `value` transformer replaces the value of a w3c fontFamily token with a `$type` of `fontFamily` with a `css` fontFamily string.

```js
myStyleDictionary.extend({
  platforms: {
    ts: {
      transforms: ['fontFamily/css'],
      files: [
        {
          // ...
        },
      ],
    },
  },
})
```

##### Before transformation

```js
{
  fontFamily: {
    body: {
      value: ['helvetica', 'sans-serif', 'Helvetica Neue'],
      $type: "fontFamily"
    }
  }
}
```

##### After transformation

```js
{
  fontFamily: {
    body: {
      value: "helvetica, sans-serif, 'Helvetica Neue'",
      $type: "fontFamily"
    }
  }
}
```

### fontWeight/number

This `value` transformer replaces the value of a w3c fontWeight token with a `$type` of `fontWeight` with a `css` fontWeight number.

```js
myStyleDictionary.extend({
  platforms: {
    ts: {
      transforms: ['fontWeight/number'],
      files: [
        {
          // ...
        },
      ],
    },
  },
})
```

##### Before transformation

```js
{
  fontWeight: {
    body: {
      value: "light",
      $type: "fontWeight"
    }
  }
}
```

##### After transformation

```js
{
  fontWeight: {
    body: {
      value: 300,
      $type: "fontWeight"
    }
  }
}
```

### gradient/css

This `value` transformer replaces the value of a w3c gradient token with a `$type` of `gradient` with a `css` gradient string.

```js
myStyleDictionary.extend({
  platforms: {
    ts: {
      transforms: ['gradient/css'],
      files: [
        {
          // ...
        },
      ],
    },
  },
})
```

##### Before transformation

```js
{
  gradients: {
    blueToGreen: {
      angle: "45deg"
      value: value: [
        {
          "color": "#288BD2",
          "position": 0
        },
        {
          "color": "#28D29F",
          "position": 1
        }
      ],
      $type: "gradient"
    }
  }
}
```

##### After transformation

```js
{
  gradients: {
    blueToGreen: {
      value: "45deg, #288BD2 0%, #28D29F 100%",
      $type: "gradient"
    }
  }
}
```

### cubicBezier/css

This `value` transformer replaces the value of a w3c cubicBezier token with a `$type` of `cubicBezier` with a `css` cubicBezier string.

```js
myStyleDictionary.extend({
  platforms: {
    ts: {
      transforms: ['cubicBezier/css'],
      files: [
        {
          // ...
        },
      ],
    },
  },
})
```

##### Before transformation

```js
{
  shadow: {
    small: {
      value: {
        x1: 0.5,
        y1: 0,
        x2: 1,
        y2: 1
      },
      $type: "cubicBezier"
    }
  }
}
```

##### After transformation

```js
{
  shadow: {
    small: {
      value: "cubic-bezier(0.5, 0, 1, 1)",
      $type: "cubicBezier"
    }
  }
}
```

### clamp/css

This `value` transformer replaces the value of a token with a `$type` of `clamp` that has a `$value` object with `min`, `ideal` and `max` property, with a css `clamp` function.

```js
myStyleDictionary.extend({
  platforms: {
    json: {
      transforms: ['clamp/css'],
      files: [
        {
          // ...
        },
      ],
    },
  },
})
```

##### Before transformation

```js
{
  size: {
    small: {
      value: {
        min: "1.5rem",
        ideal: "0.5vw + 0.75rem",
        max: "2.5rem"
      },
      $type: "clamp"
    }
  }
}
```

##### After transformation

```js
{
  size: {
    small: {
      value: "clamp(1.5rem, 0.5vw + 0.75rem, 2.5rem)",
      $type: "clamp"
    }
  }
}
```

## 🚦 Filters

Filters are used to filter out unwanted tokens when [configuring output files](https://amzn.github.io/style-dictionary/#/config?id=file)

Each filter is available in two ways:

1. **As a registered filter** - Use the filter name as a string (e.g., `"isSource"`) in your Style Dictionary configuration
2. **As an importable function** - Import the filter function directly (e.g., `isSourceFilter`) for use in custom transformers or advanced filtering

```js
// Using registered filter by name
myStyleDictionary.extend({
  platforms: {
    ts: {
      files: [{
        filter: "isSource", // ← registered filter name
        // ...
      }]
    }
  }
});

// Importing and using filter function directly
import {isSourceFilter} from 'style-dictionary-utils/filter/isSource.js'

// Use in custom transformer
StyleDictionary.registerTransform({
  name: 'my-custom-transform',
  filter: isSourceFilter, // ← imported filter function
  transform: (token) => // ...
});
```

### isSource

Only allows tokens that come from a [`source`](https://amzn.github.io/style-dictionary/#/config?id=attributes) file to be included in the output. Tokens from an [`include`](https://amzn.github.io/style-dictionary/#/config?id=attributes) will be removed.

**Filter name:** `"isSource"`  
**Import function:** `isSourceFilter` from `'style-dictionary-utils/filter/isSource.js'`

```js
myStyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        "filter": "isSource",
        // ...
      }]
    }
  }
});
```

### isColor

Only allows tokens with a `$type` property of `color`.

**Filter name:** `"isColor"`  
**Import function:** `isColorFilter` from `'style-dictionary-utils/filter/isColor.js'`

```js
myStyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        "filter": "isColor",
        // ...
      }]
    }
  }
});
```

### isGradient

Only allows tokens with a `$type` property of `gradient`.

**Filter name:** `"isGradient"`  
**Import function:** `isGradientFilter` from `'style-dictionary-utils/filter/isGradient.js'`

```js
myStyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        "filter": "isGradient",
        // ...
      }]
    }
  }
});
```

### isTypography

Only allows tokens with a `$type` property of `typography`.

**Filter name:** `"isTypography"`  
**Import function:** `isTypographyFilter` from `'style-dictionary-utils/filter/isTypography.js'`

```js
myStyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        "filter": "isTypography",
        // ...
      }]
    }
  }
});
```

### isTransition

Only allows tokens with a `$type` property of `transition`.

**Filter name:** `"isTransition"`  
**Import function:** `isTransitionFilter` from `'style-dictionary-utils/filter/isTransition.js'`

```js
myStyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        "filter": "isTransition",
        // ...
      }]
    }
  }
});
```

### isStrokeStyle

Only allows tokens with a `$type` property of `strokeStyle`.

**Filter name:** `"isStrokeStyle"`  
**Import function:** `isStrokeStyleFilter` from `'style-dictionary-utils/filter/isStrokeStyle.js'`

```js
myStyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        "filter": "isStrokeStyle",
        // ...
      }]
    }
  }
});
```

### isShadow

Only allows tokens with a `$type` property of `shadow`.

**Filter name:** `"isShadow"`  
**Import function:** `isShadowFilter` from `'style-dictionary-utils/filter/isShadow.js'`

```js
myStyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        "filter": "isShadow",
        // ...
      }]
    }
  }
});
```

### isFontWeight

Only allows tokens with a `$type` property of `fontWeight`.

**Filter name:** `"isFontWeight"`  
**Import function:** `isFontWeightFilter` from `'style-dictionary-utils/filter/isFontWeight.js'`

```js
myStyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        "filter": "isFontWeight",
        // ...
      }]
    }
  }
});
```

### isFontFamily

Only allows tokens with a `$type` property of `fontFamily`.

**Filter name:** `"isFontFamily"`  
**Import function:** `isFontFamilyFilter` from `'style-dictionary-utils/filter/isFontFamily.js'`

```js
myStyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        "filter": "isFontFamily",
        // ...
      }]
    }
  }
});
```

### isDuration

Only allows tokens with a `$type` property of `duration`.

**Filter name:** `"isDuration"`  
**Import function:** `isDurationFilter` from `'style-dictionary-utils/filter/isDuration.js'`

```js
myStyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        "filter": "isDuration",
        // ...
      }]
    }
  }
});
```

### isDimension

Only allows tokens with a `$type` property of `dimension`.

**Filter name:** `"isDimension"`  
**Import function:** `isDimensionFilter` from `'style-dictionary-utils/filter/isDimension.js'`

```js
myStyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        "filter": "isDimension",
        // ...
      }]
    }
  }
});
```

### isCubicBezier

Only allows tokens with a `$type` property of `cubicBezier`.

**Filter name:** `"isCubicBezier"`  
**Import function:** `isCubicBezierFilter` from `'style-dictionary-utils/filter/isCubicBezier.js'`

```js
myStyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        "filter": "isCubicBezier",
        // ...
      }]
    }
  }
});
```

### isBorder

Only allows tokens with a `$type` property of `border`.

**Filter name:** `"isBorder"`  
**Import function:** `isBorderFilter` from `'style-dictionary-utils/filter/isBorder.js'`

```js
myStyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        "filter": "isBorder",
        // ...
      }]
    }
  }
});
```

### isClamp

Only allows tokens with a `$type` property of `clamp` and an object as the `$value` with a `min`, `ideal` and `max` property.

**Filter name:** `"isClamp"`  
**Import function:** `isClampFilter` from `'style-dictionary-utils/filter/isClamp.js'`

```js
myStyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        "filter": "isClamp",
        // ...
      }]
    }
  }
});
```

### isNumber

Only allows tokens with a `$type` property of `number`.

**Filter name:** `"isNumber"`  
**Import function:** `isNumberFilter` from `'style-dictionary-utils/filter/isNumber.js'`

```js
myStyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        "filter": "isNumber",
        // ...
      }]
    }
  }
});
```

### isDeprecated

Only allows tokens with a `$deprecated` property that is either `true` or a `string` (deprecation message).

**Filter name:** `"isDeprecated"`  
**Import function:** `isDeprecatedFilter` from `'style-dictionary-utils/filter/isDeprecated.js'`

```js
myStyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        "filter": "isDeprecated",
        // ...
      }]
    }
  }
});
```

## 🚦 Special Filter

### getHasAttribute

The `getHasAttribute` function returns a `filter` function that filters by one or multiple properties.
You can provide one or multiple arguments that are used to check of the token has at least one of those properties.

```js
{
  color: {
    red: {
      $value: 'red',
      deprecated: true // e.g. check that a deprecated attribute exists
    }
  }
}
```

##### Register as a new filter

```js
import StyleDictionary from 'style-dictionary-utils'
import {getHasAttribute} from 'style-dictionary-utils/filter/getHasAttribute.js'

StyleDictionary.registerFilter({
  name: 'shouldAvoid',
  matcher: getHasAttribute('deprecated', 'removed'),
})
```

##### Use directly in platform

```js
import StyleDictionary from 'style-dictionary-utils'
import {getHasAttribute} from 'style-dictionary-utils/filter/getHasAttribute.js'

myStyleDictionary.extend({
  "platforms": {
    "deprecatedJson": {
      "transforms": //...,
      "files": [{
        "filter": getHasAttribute('deprecated','removed'), // allows only tokens with a `deprecated` or `removed propery, e.g. if you want` to create a json with tokens not to use.
        // ...
      }]
    }
  }
});
```

### getHasAttributeValue

The `getHasAttributeValue` function returns a `filter` function that filters by one or multiple properties that have a specific value.
You can provide a `string` or `array` of `string`s for the first argument, to define which properties should be checked.
Similarily you can provide one value or an `array` of values for the second argument, to define which values to check against. **Note:** If you provide an array of values every property can have either of those values.

```js
getHasAttributeValue(attributes: string[], values: any[])
```

```js
{
  color: {
    red: {
      $value: 'red',
      deprecated: true // e.g. check that a deprecated value exists and is `true`
    }
  }
}
```

##### Register as a new filter

```js
import StyleDictionary from 'style-dictionary-utils'
import {getHasAttributeValue} from 'style-dictionary-utils/filter/getHasAttributeValue.js'

StyleDictionary.registerFilter({
  name: 'isDeprecated',
  matcher: getHasAttributeValue('deprecated', true),
})
```

##### Use directly in platform

```js
import StyleDictionary from 'style-dictionary-utils'
import {getHasAttributeValue} from 'style-dictionary-utils/filter/getHasAttributeValue.js'

myStyleDictionary.extend({
  "platforms": {
    "deprecatedJson": {
      "transforms": //...,
      "files": [{
        "filter": getHasAttributeValue('deprecated',true), // allows only tokens with a `deprecated` property that is true
        // ...
      }]
    }
  }
});
```

### getIsType

The `getIsType` function returns a `filter` function that filters by one or multiple types.
You can provide one or multiple arguments that are used as types to filter against the `$type` property.

##### Register as a new filter

```js
import StyleDictionary from 'style-dictionary-utils'
import {getIsType} from 'style-dictionary-utils/filter/getIsType.js'

StyleDictionary.registerFilter({
  name: 'isAnimation',
  matcher: getIsType('duration', 'transition', 'cubicBezier'),
})
```

##### Use directly in platform

```js
import StyleDictionary from 'style-dictionary-utils'
import {getIsType} from 'style-dictionary-utils/filter/getIsType.js'

myStyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        "filter": getIsType('size','dimension'), // allows only tokens with $type `size` or `dimension`
        // ...
      }]
    }
  }
});
```
