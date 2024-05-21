# Style dictionary utils

[![npm](https://img.shields.io/npm/v/style-dictionary-utils?color=red)](https://www.npmjs.com/package/style-dictionary-utils)
[![GitHub release (release name instead of tag name)](https://img.shields.io/github/v/release/lukasoppermann/style-dictionary-utils)](https://github.com/lukasoppermann/style-dictionary-utils/releases)


`style-dictionary-utils` is a collection of `parsers`, `filters`, `transformers` and `formats` for [Style Dictionary](https://amzn.github.io/style-dictionary) that make working with [w3c design tokens](https://github.com/design-tokens/community-group) a lot easier.

## Installation

Install the `style-dictionary-utils` as well as `style-dictionary`.

```bash
npm i -D style-dictionary-utils style-dictionary
```

If you are using `.json5` files to define your design tokens install [`json5`](https://json5.org/) as well.

```bash
npm i -D json5
```

## Getting started

The easiest way to use `style-dictionary-utils` is to import the prepared `StyleDictionary` object into your build file:

```js
// build.ts
import StyleDictionary from 'style-dictionary-utils'

const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": ['color/hexAlpha', 'shadow/css'],
      "files": [{
        "filter": "isSource",
        "destination": "tokens.ts",
        "format": "javascript/esm",
      }]
    }
  }
});

myStyleDictionary.buildAllPlatforms();
```

Now all the included utilities<sup>*</sup> are available to you via the keys mentioned in the docs below.

<sup>*</sup> You only need to register the [`w3cTokenJson5Parser`](#w3ctokenjson5parser-not-autoloaded) if you want to use `json5`.

## Extending style dictionary

You can still extend style dictionary with your own transformers and formats like before.
The only difference is that you must use the `StyleDictionary` object that you import from `style-dictionary-utils`.

```js
// build.ts
import StyleDictionary from 'style-dictionary-utils'

StyleDictionary.registerTransform({
  name: 'transform/pxToRem',
  type: `value`,
  transitive: true,
  transformer: () => // ...
})
```

[Look at the tests](./__tests__/index.test.ts) to get an idea how it works.

## Included utilities

- Parsers
  - [w3c token json parser](#w3ctokenjsonparser)
  - [w3c token json5 parser](#w3ctokenjson5parser-not-autoloaded)
- Formats
  - [javascript/esm](#javascriptesm)
  - [javascript/commonJs](#javascriptcommonJs)
  - [css/advanced](#cssadvanced)
- Transformers
  - [name/pathToDotNotation](#namepathtodotnotation)
  - [name/pathToCamelCase](#namepathtocamelcase)
  - [color/rgbAlpha](#colorrgbalpha)
  - [color/hexAlpha](#colorhexalpha)
  - [color/hex](#colorhex)
  - [color/rgba](#colorrgba)
  - [color/rgbaFloat](#colorrgbafloat)
  - [shadow/css](#shadowcss)
  - [font/css](#fontcss)
  - [fontFamily/css](#fontfamilycss)
  - [fontWeight/number](#fontweightnumber)
  - [gradient/css](#gradientcss)
  - [cubicBezier/css](#cubicbeziercss)
  - [dimension/pixelToRem](#dimensionpixeltorem)
  - [dimension/remToPixel](#dimensionremtopixel)
  - [dimension/pixelUnitless](#dimensionpixelunitless)
  - [clamp/css](#clampcss)
- Filters
  - [isSource](#issource)
  - [isColor](#iscolor)
  - [isGradient](#isgradient)
  - [isColorOrGradient](#iscolororgradient)
  - [isTypography](#istypography)
  - [isTypographic](#istypographic)
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
- Special Filter
  - [getHasAttribute](#gethasattribute)
  - [getHasAttributeValue](#gethasattributevalue)
  - [getIsType](#getisyype)
## 📠 Parsers

### w3cTokenJsonParser
This parser parses `.json` with [w3c design tokens](https://github.com/design-tokens/community-group).

This means the following files can be used with this parser.

```json
{
  "token": {
    "value": "#223344",
    "type": "color",
    "description": "token description"
  },
  "w3cToken": {
    "$value": "#223344",
    "$type": "color",
    "$description": "token description"
  }
}
```

The parser will keep most propertys as is and only change `$value` to `value` and `$description` or `description` to `comment`. This required for [Style Dictionary](https://amzn.github.io/style-dictionary).

To register the parsers add the following code to your build file.

```js
import StyleDictionary from 'style-dictionary-utils'
import { w3cTokenJsonParser } from 'style-dictionary-utils/dist/parser/w3c-token-json-parser'

StyleDictionary.registerParser(w3cTokenJsonParser)
```

### w3cTokenJson5Parser (not autoloaded)
If you are using `.json5` or `.jsonc` files to define your design tokens you need to use the `w3cTokenJson5Parser`. This is NOT enabled by default as it requires an additonal package, [`json5`](https://json5.org/), to work.

This parser is exactly the same as the `w3cTokenJsonParser` with the only difference that it can parse `.json5` or `.jsonc`.

To register the parsers add the following code to your build file.

```js
import StyleDictionary from 'style-dictionary-utils'
import { w3cTokenJson5Parser } from 'style-dictionary-utils/dist/parser/w3c-token-json5-parser'

StyleDictionary.registerParser(w3cTokenJson5Parser)
```

Make sure to install [`json5`](https://json5.org/) by running `npm i -D json5`.

If you’re using [Prettier](https://prettier.io/), be aware that the default configuration removes [quote props](https://prettier.io/docs/en/options.html#quote-props), which are needed in `$type` and `$value` props in order to parse the tokens.

Here’s an example of a prettier config that overrides the default:

```yaml
semi: false
singleQuote: true
overrides:
  - files: '*.json[c|5]'
    options:
      quoteProps: preserve
      singleQuote: false
```

## 📑 Formats

### javascript/esm

The `javascript/esm` format exports a token dictionary as an `es6 export` statement.

```js
export default {
  colors: {
    primary: '#0D70E6'
  }
}
```

##### Usage:
```js
const myStyleDictionary = StyleDictionary.extend({
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

### javascript/commonJs

The `javascript/commonJs` format exports a token dictionary as an `commonJs module`.

```js
exports.default = {
  colors: {
    primary: '#0D70E6'
  }
}
```
##### Usage:
```js
const myStyleDictionary = StyleDictionary.extend({
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

### css/advanced

The `css/advanced` format exports a token dictionary as a `css` file with css variables. It allows you to define media queries that can wrap specific parts of your css variables. If nothing is defined the entire file will be wrapped in a `:root` selector.

You can change the selector by defining it in `file.options.selector`.

You can define rules on a file level using `file.options.rules`. If one or more rules are defined, only tokens within any of the rules will be output. You can define as many rule objects within `file.options.rules` as you want. Tokens can be part of one or multiple rules.

A rule object may have any or all of the three properties `atRule`, `selector` and  `matcher`.

- `selector` is a string that is wrapped around your css. If the `selector` is undefined, the default selector or one define at `file.options.selector` will be used. If you don't want a selector, set it to `false`.
- `atRule` can be a string or array of strings, that are wrapped around the css and `selector` with the first being the outer layer.
- `matcher` is a filter function that returns true for tokens that should be included in the query. If you want to match all tokens, just return true from the matcher.

```css
body[theme="dark"] {
  --color-background-primary: #ff0000;
  --color-background-secondary: #0000ff;
}
@media (min-width: 768px) {
  body[theme="dark"] {
    --color-button-primary: #c1c1c1;
    --color-button-secondary: #007D79;
  }
}
```

##### Usage:
```js
const myStyleDictionary = StyleDictionary.extend({
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

## 🤖 Transformers
Transforms change the `value` or `name` of a token.
You can use transforms by refering the name in the array value of the [`transforms` ](https://amzn.github.io/style-dictionary/#/transforms)property of a [`platform`](https://amzn.github.io/style-dictionary/#/config?id=platform).
### Transform group
If you want to use the same `transformers` multiple times you can create a [`transform group`](https://amzn.github.io/style-dictionary/#/api?id=registertransformgroup) for easy reference.

```js
StyleDictionary.registerTransformGroup({
  name: 'webHex',
  transforms: [
    'color/hexAlpha',
    'dimension/pixelToRem',
    'font/css'
  ]
});
```

#### `css/extended` transform group
This packages ships a predefined transform group, called `css/extended`.
It includes all transforms from the original [`css` transform group](https://amzn.github.io/style-dictionary/#/transform_groups?id=css) as well as the following transforms: `color/rgbAlpha`, `shadow/css`, `font/css`, `fontFamily/css`, `fontWeight/number`, `name/pathToDotNotation`, `cubicBezier/css`, `border/css`.

You can use it like any other transform Group:

```js
const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "css": {
      "transformGroup": 'css/extended',
      "files": [{
        // ...
      }]
    }
  }
});
```

### name/pathToDotNotation

This `name` transformer replaces the token name with the entire path of the token in dot.notation.
This is especially useful for flat `.js` or `.json` files.

To use it simply add `name/pathToDotNotation` to the `transforms` array.

```js
const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": ['name/pathToDotNotation'],
      "files": [{
        // ...
      }]
    }
  }
});
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
const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": ['name/pathToCamelCase'],
      "files": [{
        // ...
      }]
    }
  }
});
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

### color/rgbAlpha

This `value` transformer replaces the value of a token with a `$type` or `type` of `color` with an `rgba` string. If the token has an `alpha` value, it will be used as the `alpha` of the `rgba` string.

**Note:** If your initial color value has an alpha value (e.g. `hex8`) **AND** you add an `alpha` property, the `alpha` property will simply replace the previous alpha value.

```js
const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": ['color/rgbAlpha'],
      "files": [{
        // ...
      }]
    }
  }
});
```
##### Before transformation

```js
{
  colors: {
    blue: {
      500: {
        value: "#0D70E6",
        $type: "color",
        alpha: 0.4
      }
    }
  }
}
```

##### After transformation

```js
{
  colors: {
    blue: {
      500: {
        value: "rgba(13, 112, 230, 0.4)",
        $type: "color",
        alpha: 0.4
      }
    }
  }
}
```

### color/hexAlpha
This `value` transformer replaces the value of a token with a `$type` or `type` of `color` with a `hex` string. If the token has an `alpha` value, it will be used as the `alpha` of the `hex8` string.

**Note:** If your initial color value has an alpha value (e.g. `rgba`) **AND** you add an `alpha` property, the `alpha` property will simply replace the previous alpha value.

```js
const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": ['color/hexAlpha'],
      "files": [{
        // ...
      }]
    }
  }
});
```
##### Before transformation

```js
{
  colors: {
    blue: {
      500: {
        value: "rgba(13, 112, 230, 0.4)",
        $type: "color",
        alpha: 0.2
      }
    }
  }
}
```

##### After transformation

```js
{
  colors: {
    blue: {
      500: {
        value: "#0D70E633", // prev alpha value is replaced with 0.2 from alpha property
        $type: "color",
        alpha: 0.2
      }
    }
  }
}
```

### color/hex

This `value` transformer replaces the value of a token with a `$type` or `type` of `color` with a `hex` string.

```js
const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": ['color/hex'],
      "files": [{
        // ...
      }]
    }
  }
});
```
##### Before transformation

```js
{
  colors: {
    blue: {
      500: {
        value: "rgba(13, 112, 230, 0.4)",
        $type: "color"
      }
    }
  }
}
```

##### After transformation

```js
{
  colors: {
    blue: {
      500: {
        value: "#0D70E666",
        $type: "color"
      }
    }
  }
}
```

### color/rgba

This `value` transformer replaces the value of a token with a `$type` or `type` of `color` with an `rgba` string.

```js
const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": ['color/rgba'],
      "files": [{
        // ...
      }]
    }
  }
});
```
##### Before transformation

```js
{
  colors: {
    blue: {
      500: {
        value: "#0D70E666",
        $type: "color"
      }
    }
  }
}
```

##### After transformation

```js
{
  colors: {
    blue: {
      500: {
        value: "rgba(13, 112, 230, 0.4)",
        $type: "color"
      }
    }
  }
}
```

### color/rgbaFloat

This `value` transformer replaces the value of a token with a `$type` or `type` of `color` with an `rgba float` object.
This is helpful for tools and platforms and use float rgba values where the `r`, `g`, `b` and `a` values go from `0` to `1`. For example when preparing tokens to be imported into Figma.

```js
const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "json": {
      "transforms": ['color/rgbaFloat'],
      "files": [{
        // ...
      }]
    }
  }
});
```
##### Before transformation

```js
{
  colors: {
    blue: {
      500: {
        value: "#0D70E666",
        $type: "color"
      }
    }
  }
}
```

##### After transformation

```js
{
  colors: {
    blue: {
      500: {
        value: {
          r: 0.051,
          g: 0.439,
          b: 0.902,
          a: 0.4
        },
        $type: "color"
      }
    }
  }
}
```

### shadow/css

This `value` transformer replaces the value of a w3c shadow token with a `$type` or `type` of `shadow` with a `css` shadow string.

```js
const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": ['shadow/css'],
      "files": [{
        // ...
      }]
    }
  }
});
```
##### Before transformation

```js
{
  shadow: {
    small: {
      value: {
        "color": "#00000066",
        "offsetX": "0px",
        "offsetY": "1px",
        "blur": "2px",
        "spread": "0px"
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
    small: {
      value: "0px 1px 2px 0px #00000066",
      $type: "shadow"
    }
  }
}
```

### font/css
This `value` transformer replaces the value of a w3c typography token with a `$type` or `type` of `typography` with a `css` font string.

```js
const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": ['font/css'],
      "files": [{
        // ...
      }]
    }
  }
});
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
This `value` transformer replaces the value of a w3c fontFamily token with a `$type` or `type` of `fontFamily` with a `css` fontFamily string.

```js
const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": ['fontFamily/css'],
      "files": [{
        // ...
      }]
    }
  }
});
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
This `value` transformer replaces the value of a w3c fontWeight token with a `$type` or `type` of `fontWeight` with a `css` fontWeight number.

```js
const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": ['fontWeight/number'],
      "files": [{
        // ...
      }]
    }
  }
});
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
This `value` transformer replaces the value of a w3c gradient token with a `$type` or `type` of `gradient` with a `css` gradient string.

```js
const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": ['gradient/css'],
      "files": [{
        // ...
      }]
    }
  }
});
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

This `value` transformer replaces the value of a w3c cubicBezier token with a `$type` or `type` of `cubicBezier` with a `css` cubicBezier string.

```js
const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": ['cubicBezier/css'],
      "files": [{
        // ...
      }]
    }
  }
});
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

### dimension/pixelToRem
This `value` transformer replaces the value of a token with a `$type` or `type` of `dimension` that has a `px` value, with a `rem` value.

```js
const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": ['dimension/pixelToRem'],
      "files": [{
        // ...
      }],
      options: {
        basePxFontSize: 16
      }
    }
  }
});
```
##### Before transformation

```js
{
  size: {
    small: {
      value: "32px",
      $type: "dimension"
    }
  }
}
```

##### After transformation

```js
{
  size: {
    small: {
      value: "2rem",
      $type: "dimension"
    }
  }
}
```
### dimension/remToPixel

This `value` transformer replaces the value of a token with a `$type` or `type` of `dimension` that has a `rem` value, with a `px` value.

```js
const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": ['dimension/remToPixel'],
      "files": [{
        // ...
      }],
      options: {
        basePxFontSize: 16
      }
    }
  }
});
```
##### Before transformation

```js
{
  size: {
    small: {
      value: "2rem",
      $type: "dimension"
    }
  }
}
```

##### After transformation

```js
{
  size: {
    small: {
      value: "32px",
      $type: "dimension"
    }
  }
}
```

### dimension/pixelUnitless

This `value` transformer replaces the value of a token with a `$type` or `type` of `dimension` that has a `rem` or `px` value, with a unitless `pixel` based value. This is useful for example when preparing tokens to be imported into Figma.

```js
const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "json": {
      "transforms": ['dimension/pixelUnitless'],
      "files": [{
        // ...
      }],
      options: {
        basePxFontSize: 16
      }
    }
  }
});
```

### clamp/css

This `value` transformer replaces the value of a token with a `$type` or `type` of `clamp` that has a `$value` object with `min`, `ideal` and `max` property, with a css `clamp` function.

```js
const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "json": {
      "transforms": ['clamp/css'],
      "files": [{
        // ...
      }],
    }
  }
});
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
### isSource

Only allows tokens that come from a [`source`](https://amzn.github.io/style-dictionary/#/config?id=attributes) file to be included in the output. Tokens from an [`include`](https://amzn.github.io/style-dictionary/#/config?id=attributes) will be removed.

```js
const myStyleDictionary = StyleDictionary.extend({
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

Only allows tokens with a `type` or `$type` property of `color`.

```js
const myStyleDictionary = StyleDictionary.extend({
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
Only allows tokens with a `type` or `$type` property of `gradient`.

```js
const myStyleDictionary = StyleDictionary.extend({
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

### isColorOrGradient
Only allows tokens with a `type` or `$type` property of `color` or `gradient`.

```js
const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        "filter": "isColorOrGradient",
        // ...
      }]
    }
  }
});
```

### isTypography
Only allows tokens with a `type` or `$type` property of `typography`.

```js
const myStyleDictionary = StyleDictionary.extend({
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

### isTypographic
Only allows tokens with a `type` or `$type` property of `typography`, `fontWeight` or `fontFamily`.

```js
const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        "filter": "isTypographic",
        // ...
      }]
    }
  }
});
```
### isTransition
Only allows tokens with a `type` or `$type` property of `transition`.

```js
const myStyleDictionary = StyleDictionary.extend({
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
Only allows tokens with a `type` or `$type` property of `strokeStyle`.

```js
const myStyleDictionary = StyleDictionary.extend({
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
Only allows tokens with a `type` or `$type` property of `shadow`.

```js
const myStyleDictionary = StyleDictionary.extend({
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
Only allows tokens with a `type` or `$type` property of `fontWeight`.

```js
const myStyleDictionary = StyleDictionary.extend({
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
Only allows tokens with a `type` or `$type` property of `fontFamily`.

```js
const myStyleDictionary = StyleDictionary.extend({
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
Only allows tokens with a `type` or `$type` property of `duration`.

```js
const myStyleDictionary = StyleDictionary.extend({
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
Only allows tokens with a `type` or `$type` property of `dimension`.

```js
const myStyleDictionary = StyleDictionary.extend({
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
Only allows tokens with a `type` or `$type` property of `cubicBezier`.

```js
const myStyleDictionary = StyleDictionary.extend({
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
Only allows tokens with a `type` or `$type` property of `border`.

```js
const myStyleDictionary = StyleDictionary.extend({
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
Only allows tokens with a `type` or `$type` property of `clamp` and an object as the `$value` with a `min`, `ideal` and `max` property.

```js
const myStyleDictionary = StyleDictionary.extend({
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
import {getHasAttribute} from 'style-dictionary-utils/dist/filter/getHasAttribute'

StyleDictionary.registerFilter({
  name: 'shouldAvoid',
  matcher: getHasAttribute('deprecated','removed')
})
```
##### Use directly in platform
```js
import StyleDictionary from 'style-dictionary-utils'
import {getHasAttribute} from 'style-dictionary-utils/dist/filter/getHasAttribute'

const myStyleDictionary = StyleDictionary.extend({
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
import {getHasAttributeValue} from 'style-dictionary-utils/dist/filter/getHasAttributeValue'

StyleDictionary.registerFilter({
  name: 'isDeprecated',
  matcher: getHasAttributeValue('deprecated',true)
})
```
##### Use directly in platform
```js
import StyleDictionary from 'style-dictionary-utils'
import {getHasAttributeValue} from 'style-dictionary-utils/dist/filter/getHasAttributeValue'

const myStyleDictionary = StyleDictionary.extend({
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
You can provide one or multiple arguments that are used as `types` to filter against the `type` or `$type` property.

##### Register as a new filter

```js
import StyleDictionary from 'style-dictionary-utils'
import {getIsType} from 'style-dictionary-utils/dist/filter/getIsType'

StyleDictionary.registerFilter({
  name: 'isAnimation',
  matcher: getIsType('duration','transition', 'cubicBezier')
})
```
##### Use directly in platform
```js
import StyleDictionary from 'style-dictionary-utils'
import {getIsType} from 'style-dictionary-utils/dist/filter/getIsType'

const myStyleDictionary = StyleDictionary.extend({
  "platforms": {
    "ts": {
      "transforms": //...,
      "files": [{
        "filter": getIsType('size','dimension'), // allows only tokens with type `size` or `dimension`
        // ...
      }]
    }
  }
});
```
