"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyIsValidNumber = void 0;
/**
 *
 * @param property
 * @param propertyName
 * checks if the property is valid number otherwise @throws and error
 */
const propertyIsValidNumber = (property, propertyName) => {
    if (typeof property === 'undefined' || property === '')
        throw new Error(`Veuillez completer ce champ : ${propertyName}  `);
    const regex = /^\d+(\.\d+)?$/;
    const isvalid = regex.test(property.toString());
    if (!isvalid)
        throw new Error(`Charactère invalid ---> : ${property}`);
};
exports.propertyIsValidNumber = propertyIsValidNumber;
//# sourceMappingURL=propertyIsValidNumber.js.map