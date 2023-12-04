"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ID = void 0;
class ID {
    constructor(id) {
        this.id = id;
        this.id = id;
        if (!this.isValid())
            throw new Error('Invalid ID');
    }
    getId() {
        return this.id;
    }
    isValid() {
        const id = parseInt(this.toString());
        return !Number.isNaN(id) ? true : false;
    }
    toString() {
        return this.id.toString();
    }
}
exports.ID = ID;
//# sourceMappingURL=ID.js.map