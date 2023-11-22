import { JournalTransactionType } from "../../../../../entities/Journal";



export function isValidTransactionStatus(target: any, propertyKey: string) {
    let value = target[propertyKey];
  
    const getter = function () {
      return value;
    };
  
    const setter = function (newValue: number) {
      if (newValue !== JournalTransactionType.CREDIT && newValue !== JournalTransactionType.CREDIT) {
        throw new Error(`Transaction invalide !.`);
      }
      value = newValue;
    };
  
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  }