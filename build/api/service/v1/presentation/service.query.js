"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceQueries = void 0;
const GetServicePayment_1 = require("../domain-model/usecases/GetServicePayment");
const GetServices_1 = require("../domain-model/usecases/GetServices");
const TypeormServiceRepo_1 = require("../repository/TypeormServiceRepo");
exports.ServiceQueries = {
    services: (root, { name, userId, page }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new GetServices_1.GetServiceUserCase(TypeormServiceRepo_1.serviceRepo);
        const { services, count, totalPages } = yield usecase.execute(name, userId, page);
        return { services, count, totalPages };
    }),
    servicesPayment: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new GetServicePayment_1.GetServicePaymentUserCase(TypeormServiceRepo_1.serviceRepo);
        const { services, count, totalPages } = yield usecase.execute(input);
        return { services, count, totalPages };
    }),
};
//# sourceMappingURL=service.query.js.map