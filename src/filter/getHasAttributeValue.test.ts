import StyleDictionary from 'style-dictionary';
import { getHasAttributeValue } from './getHasAttributeValue';

describe('Filter: getHasAttributeValue', () => {
  const items = [{
    value: '300ms',
    deprecated: true,
  }, {
    value: '2rem',
    $type: 'dimension',
    $deprecated: false,
  }, {
    value: 'string',
    number: 1,
  }, {
    value: { isValid: true },
  }] as StyleDictionary.TransformedToken[];

  it('filters type tokens', () => {
    expect(items.filter(getHasAttributeValue('value', 'string'))).toStrictEqual([items[2]]);
    expect(items.filter(getHasAttributeValue('deprecated', [true, false]))).toStrictEqual([items[0]]);
    expect(items.filter(getHasAttributeValue(['deprecated', '$deprecated'], [true, false]))).toStrictEqual([items[0], items[1]]);
    expect(items.filter(getHasAttributeValue(['number', 'value'], [{ isValid: true }, '2rem', 1]))).toEqual([items[1], items[2], items[3]]);
  });
});
