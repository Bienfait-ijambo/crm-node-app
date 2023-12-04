"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleStrategyData = void 0;
const logger_1 = require("../../../../../../../infrastructure/graphql-server/winston/logger");
function getGoogleStrategyData(profile) {
    try {
        const input = {
            id: profile === null || profile === void 0 ? void 0 : profile.id,
            displayName: profile === null || profile === void 0 ? void 0 : profile.displayName,
            name: { familyName: '', givenName: '' },
            email: profile === null || profile === void 0 ? void 0 : profile.emails[0].value,
            photo: profile === null || profile === void 0 ? void 0 : profile.photos[0].value
        };
        return input;
    }
    catch (error) {
        (0, logger_1.logErrorToFile)(error.message, 'GoogleStrategy-input-error');
    }
}
exports.getGoogleStrategyData = getGoogleStrategyData;
//# sourceMappingURL=getGoogleStrategyData.js.map