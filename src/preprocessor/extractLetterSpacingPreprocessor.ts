import {PreprocessedTokens} from 'style-dictionary'
import {Config, PlatformConfig, Preprocessor} from 'style-dictionary/types'

/**
 * Recursively traverses an object and changes any child object
 * with a direct "$type" property matching the specified value,
 * replacing it with the provided replacement object.
 *
 * @param obj - The object to traverse
 * @param targetType - The $type value to match
 * @param replacement - The replacement object or function
 *                      If a function, receives (currentObj) and returns new object
 * @returns A new object with replacements applied
 */
/**
 * Recursively traverses an object and changes any child object
 * with a direct "$type" property matching the specified value,
 * replacing it with the provided replacement object.
 *
 * @param obj - The object to traverse
 * @param targetType - The $type value to match
 * @param replacement - The replacement object or function
 *                      If a function, receives (currentObj, parentObj) and returns new object
 * @returns A new object with replacements applied
 */
/**
 * Recursively traverses an object and changes any child object
 * with a direct "$type" property matching the specified value,
 * allowing a replacement function to return a MODIFIED PARENT object
 * (rather than the matched child) in-place in the parent context.
 *
 * @param obj - The object to traverse
 * @param targetType - The $type value to match
 * @param replacement - The replacement function which receives (child, parent, childKey)
 *                      and returns the new parent object, or undefined to skip replacement.
 * @returns A new object with replacements applied
 */
export function changeTypeInObject<T extends object>(
  obj: T,
  targetType: string,
  replacement: (child: any, parent: any, childKey: string | number) => any | undefined
): T {
  function recursive(current: any, parent: any, parentKey: string | number): any {
    if (typeof current !== "object" || current === null) return current;

    if (Array.isArray(current)) {
      const result = current.map((item, idx) => recursive(item, current, idx));
      // No replacement for arrays as parent (array indexes change on replacement)
      return result;
    }

    // Track if any substitution happens
    let changed = false;
    const result: any = { ...current };
    for (const key in current) {
      if (Object.prototype.hasOwnProperty.call(current, key)) {
        const child = current[key];
        // Only direct children match
        if (
          typeof child === "object" &&
          child !== null &&
          Object.prototype.hasOwnProperty.call(child, "$type") &&
          child.$type === targetType
        ) {
          // Replacement function returns new parent object if wants to change the parent
          const replacedParent = replacement(child, current, key);
          if (typeof replacedParent !== "undefined") {
            // If replacement returns a new parent, stop traversing children, and return it
            return replacedParent;
          }
        }
        // Otherwise recursively process child
        result[key] = recursive(child, current, key);
        if (result[key] !== current[key]) changed = true;
      }
    }
    return changed ? result : current;
  }
  return recursive(obj, null, "");
}

export const extractLetterSpacingPreprocessor: Preprocessor = {
  name: 'extract-letterSpacing-preprocessor',
  preprocessor: (tokens: PreprocessedTokens, _options: Config | PlatformConfig): PreprocessedTokens => {
    const newTokens = changeTypeInObject(
      tokens,
      'typography',
      (child: any, parent: any, childKey: string | number) => {
        const {letterSpacing, ...rest} = child.$value
        return {...parent, [`${childKey}`]: {...child, $value: rest}, [`${childKey}-letterSpacing`]: {$value: letterSpacing, $type: 'dimension', isSource: child.isSource, filePath: child.filePath}}
      }
    )
    return newTokens
  },
}
