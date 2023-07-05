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
    angle: "45deg",
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

  const itemsExtended2 = [{
    value: '',
    $type: 'color',
  }, {
    angle: "45deg",
    value: [
        {
          "color": "#020024",
          "position": 0
        },
        {
          "color": "#090979",
          
        },
        {
            "color": "#00d4ff",
        
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
    expect(items.filter(gradientCss.matcher as Matcher).map(item => gradientCss.transformer(item, {}))).toStrictEqual([
    "#ffff00 66%, #ff0000 100%"
    ]);
  });

  it('transforms `gradient` tokens with angles', () => {
    expect(itemsWAngle.filter(gradientCss.matcher as Matcher).map(item => gradientCss.transformer(item, {}))).toStrictEqual([
        "45deg, #ffff00 66%, #ff0000 100%"
    ]);
  });

  it('transforms `gradient` tokens with added colors', () => {
    expect(itemsExtended.filter(gradientCss.matcher as Matcher).map(item => gradientCss.transformer(item, {}))).toStrictEqual([
       "#020024, #090979 35%, #00d4ff 100%"
    ]);
  });

})