import StyleDictionary from 'style-dictionary';
import { Matcher } from 'style-dictionary/types/Matcher';
import { gradientCss } from '../../src/transformer/gradient-css';

describe('Transformer: gradientCss', () => {
  const items = [{
    value: '',
    $type: 'color',
  }, {
    value: [
        {
          "color": "#ffff00",
          "position": 0.666
        },
        {
          "color": "#ff0000",
          "position": 1
        }
      ],
    $type: 'gradient',
  }, {
    value: '',
  }] as StyleDictionary.TransformedToken[];

  const itemsWAngle = [{
    value: '',
    $type: 'color',
  }, {
    value: [
        {"angle": "45deg"},
        {
          "color": "#ffff00",
          "position": 0.666
        },
        {
          "color": "#ff0000",
          "position": 1
        }
      ],
    $type: 'gradient',
  }, {
    value: '',
  }] as StyleDictionary.TransformedToken[];

  const itemsExtended = [{
    value: '',
    $type: 'color',
  }, {
    value: [
        {
          "color": "#020024",
          "position": 0
        },
        {
          "color": "#090979",
          "position": 0.35
        },
        {
            "color": "#00d4ff",
            "position": 1
        }
      ],
    $type: 'gradient',
  }, {
    value: '',
  }] as StyleDictionary.TransformedToken[];

  it('matches `gradient` tokens', () => {
    expect(items.filter(gradientCss.matcher as Matcher)).toStrictEqual([items[1]]);
  });

  it('transforms `gradient` tokens', () => {
    const platform = {
        options: {
          basePxFontSize: 10
        }
      }
    expect(items.filter(gradientCss.matcher as Matcher).map(item => gradientCss.transformer(item, platform))).toStrictEqual([
        "#ffff00 0.666",
        "#ff0000 1"
    ]);
  });

//   it('transforms `gradient` tokens with angles', () => {
//     expect(itemsWAngle.filter(gradientCss.matcher as Matcher).map(item => gradientCss.transformer(item))).toStrictEqual([
//         "45deg",
//         "#ffff00 0.666",
//         "#ff0000 1"
//     ]);
//   });

//   it('transforms `gradient` tokens with added colors', () => {
//     expect(itemsExtended.filter(gradientCss.matcher as Matcher).map(item => gradientCss.transformer(item))).toStrictEqual([
//         "#020024 0",
//         "#090979 0.35",
//         "#00d4ff 1",
//     ]);
//   });
})