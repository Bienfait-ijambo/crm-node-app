"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.RecordTransactionUseCase = void 0;
const data_source_1 = require("../../../../../infrastructure/typeorm/data-source");
const CreateAggregateAccountDto_1 = require("../../../../aggregate-account-amount/domain-model/dto/CreateAggregateAccountDto");
const CreateJournalDto_1 = require("../dto/CreateJournalDto");
// import { SaveIntoJournalServiceUseCase } from "./SaveIntoJournalService";
const CachError_1 = require("../../../../../shared/exceptions/CachError");
class RecordTransactionUseCase {
    constructor(journalRepo, aggragateAccountRepo, serviceRepo, projectRepo) {
        this.journalRepo = journalRepo;
        this.aggragateAccountRepo = aggragateAccountRepo;
        this.serviceRepo = serviceRepo;
        this.projectRepo = projectRepo;
    }
    //  @catchError
    execute(journalInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const journalDto = new CreateJournalDto_1.CreateJournalDto(journalInput);
            const journalInsertInput = journalDto.getInsertInput();
            const aggrInput = new CreateAggregateAccountDto_1.CreateAggregateAccountDto();
            const result = yield data_source_1.AppDataSource.transaction(() => __awaiter(this, void 0, void 0, function* () {
                const doesAccountsExist = yield this.checkIfAccountExists(aggrInput, journalInput);
                if (doesAccountsExist.length > 0) {
                    //update[reduce or add]
                    const { returnAggregateInput: inputToUpdate, error, serviceStatus } = aggrInput.getAggregateUpdateInput(journalInput, doesAccountsExist);
                    if (error.length > 0)
                        throw new Error("Oops ! vous ne disposez pas suffisament des fonds dans votre Caisse/Banque !");
                    //update 
                    this.updateIntoAggregateAccount(inputToUpdate);
                    //  service payment
                    // this.createServicePayment(journalInput,serviceStatus)
                    this.journalRepo.recordTransaction(journalInsertInput);
                }
                else {
                    //insert
                    this.saveIntoAggregateAccountTable(aggrInput, journalInput);
                    this.journalRepo.recordTransaction(journalInsertInput);
                }
            }));
            return result;
        });
    }
    checkIfAccountExists(aggrInput, journalInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const doesAccountsExist = yield this.aggragateAccountRepo.checkIfAccountExists(aggrInput.getAccountIds(journalInput), journalInput[0].userId);
            return doesAccountsExist;
        });
    }
    saveIntoAggregateAccountTable(aggrInput, journalInput) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.aggragateAccountRepo.recordData(aggrInput.getInsertInput(journalInput));
        });
    }
    // /**
    //  * 
    //  * @param journalInput 
    //  * @param serviceStatus 
    //  */
    // private async createServicePayment(journalInput: IJournalDto[],serviceStatus:number){
    //  const usecase= new CreateServicePaymentUseCase(this.serviceRepo)
    //  await usecase.execute(journalInput)
    // }
    updateIntoAggregateAccount(inputToUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < inputToUpdate.length; i++) {
                yield this.aggragateAccountRepo.updateData(inputToUpdate[i]);
            }
        });
    }
}
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAggregateAccountDto_1.CreateAggregateAccountDto, Array]),
    __metadata("design:returntype", Promise)
], RecordTransactionUseCase.prototype, "checkIfAccountExists", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAggregateAccountDto_1.CreateAggregateAccountDto, Array]),
    __metadata("design:returntype", Promise)
], RecordTransactionUseCase.prototype, "saveIntoAggregateAccountTable", null);
exports.RecordTransactionUseCase = RecordTransactionUseCase;
//# sourceMappingURL=RecordTransaction.js.map