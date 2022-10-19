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
        "filter": "isSource"
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
  - [shadow/css](#shadowcss)
  - [color/rgb](#colorrgb)
  - [font/css](#fontcss)
  - [fontFamily/css](#fontFamilycss)
  - [fontWeight/number](#fontWeightnumber)
  - [cubicBezier/css](#cubicBeziercss)
  - [dimension/pixelToRem](#dimensionpixelToRem)
  - [dimension/remToPx](#dimensionremToPx)
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
### 📠 Parsers

#### w3cTokenJsonParser
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
import { w3cTokenJsonParser } from './parser/w3c-token-json-parser'

StyleDictionary.registerParser(w3cTokenJsonParser)
```

#### w3cTokenJson5Parser (not autoloaded)
If you are using `.json5` or `.jsonc` files to define your design tokens you need to use the `w3cTokenJson5Parser`. This is NOT enabled by default as it requires an additonal package, [`json5`](https://json5.org/), to work.

This parser is exactly the same as the `w3cTokenJsonParser` with the only difference that it can parse `.json5` or `.jsonc`.

To register the parsers add the following code to your build file.

```js
import StyleDictionary from 'style-dictionary-utils'
import { w3cTokenJson5Parser } from './parser/w3c-token-json5-parser'

StyleDictionary.registerParser(w3cTokenJson5Parser)
```

Make sure to install [`json5`](https://json5.org/) by running `npm i -D json5`.

### 📑 Formats

#### javascript/esm

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

#### javascript/commonJs

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

### 🤖 Transformers
#### name/pathToDotNotation
#### color/rgbAlpha
#### color/hexAlpha
#### color/hex
#### shadow/css
#### color/rgb
#### font/css
#### fontFamily/css
#### fontWeight/number
#### cubicBezier/css
#### dimension/pixelToRem
#### dimension/remToPx

### 🚦 Filters

Filters are used to filter out unwanted tokens when [configuring output files](https://amzn.github.io/style-dictionary/#/config?id=file)
#### isSource

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

#### isColor

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

#### isGradient
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

#### isColorOrGradient
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

#### isTypography
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

#### isTypographic
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
#### isTransition
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

#### isStrokeStyle
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

#### isShadow
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

#### isFontWeight
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

#### isFontFamily
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

#### isDuration
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

#### isDimension
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

#### isCubicBezier
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
#### isBorder
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
