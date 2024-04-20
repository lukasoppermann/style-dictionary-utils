import StyleDictionary from 'style-dictionary';
import { isClamp } from './isClamp';

describe('Filter: isClamp', () => {
  const items = [{
    value: '300ms',
    $type: 'clamp',
  }, {
    value: {
      test: '2rem'
    },
    $type: 'clamp',
  }, {
    value: {
      min: '2rem'
    },
    type: 'clamp',
  }, {
    value: 'string',
  },
  {
    value: {
      min: '2rem',
      ideal: '3rem',
      max: '3rem'
    },
    type: 'clamp',
  },
  {
    value: {
      min: '2rem',
      ideal: '3rem',
      max: '3rem'
    },
    type: 'dimension',
  }] as StyleDictionary.TransformedToken[];
  it('filters clamp tokens', () => {
    expect(items.filter(isClamp)).toStrictEqual([items[4]]);
  });
});