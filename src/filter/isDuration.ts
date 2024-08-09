import { TransformedToken } from 'style-dictionary/types';
/**
 * @name isDuration
 * @type filter
 * @description only returns tokens of type `duration`
 */
export const isDuration = (token: TransformedToken): boolean => token?.$type === 'duration' || token?.type === 'duration';
