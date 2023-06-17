# Style dictionary utils
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
  - [w3c token json parser](#w3cTokenJsonParser)
  - [w3c token json5 parser](#w3cTokenJson5Parser)
- Formats
  - [javascript/esm](#javascriptesm)
  - [javascript/commonJs](#javascriptcommonJs)
- Transformers
  - [name/pathToDotNotation](#namepathToDotNotation)
  - [color/rgbAlpha](#colorrgbAlpha)
  - [color/hexAlpha](#colorhexAlpha)
  - [color/hex](#colorhex)
  - [color/rgba](#colorrgba)
  - [shadow/css](#shadowcss)
  - [font/css](#fontcss)
  - [fontFamily/css](#fontFamilycss)
  - [fontWeight/number](#fontWeightnumber)
  - [cubicBezier/css](#cubicBeziercss)
  - [dimension/pixelToRem](#dimensionpixelToRem)
  - [dimension/remToPixel](#dimensionremToPixel)
- Filters
  - [isSource](#isSource)
  - [isColor](#isColor)
  - [isGradient](#isGradient)
  - [isColorOrGradient](#isColorOrGradient)
  - [isTypography](#isTypography)
  - [isTypographic](#isTypographic)
  - [isTransition](#isTransition)
  - [isStrokeStyle](#isStrokeStyle)
  - [isShadow](#isShadow)
  - [isFontWeight](#isFontWeight)
  - [isFontFamily](#isFontFamily)
  - [isDuration](#isDuration)
  - [isDimension](#isDimension)
  - [isCubicBezier](#isCubicBezier)
  - [isBorder](#isBorder)
- Special Filter
  - [getHasAttribute](#getHasAttribute)
  - [getHasAttributeValue](#getHasAttributeValue)
  - [getIsType](#getIsType)
## 📠 Parsers

### w3cTokenJsonParser
This parser parses `.json` with [w3c design tokens](https://github.com/design-tokens/community-group).

This means the following files can be used with this parser.

```js
{
  "token": {
    value: "#223344",
    type: "color",
    description: "token description"
  },
  "w3cToken": {
    $value: "#223344",
    $type: "color",
    $description: "token description"
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
        "x": "0px",
        "y": "1px",
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
