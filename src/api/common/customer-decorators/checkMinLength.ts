import { requiredPropertyError } from "../error/requiredProperty";

/**
 *
 * @param minLength
 * Checks if a str is less  or equal to {minLength} else @throws an  error
 */
export function checkMinLength(minLength: number) {
  return function (target: any, propertyKey: string) {

    let value = target[propertyKey];

    const getter = function () {
      return value;
    };

    const setter = function (newValue: string) {
        //check string length
        requiredPropertyError(newValue, `${propertyKey}`);

      if (newValue.length >= minLength) {
        value = newValue;
      } else {
        throw new Error(`${propertyKey}  must be less than ${minLength} characters`)
      }

    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}




