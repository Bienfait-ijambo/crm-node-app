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
exports.userMutations = void 0;
const CreateUser_1 = require("../../domain-model/usecases/CreateUser");
const TypeormUserRepo_1 = require("../../repository/TypeormUserRepo");
const ChangePassword_1 = require("../../domain-model/usecases/ChangePassword");
const UpdateUser_1 = require("../../domain-model/usecases/UpdateUser");
const VerifyOTPNumber_1 = require("../../domain-model/usecases/VerifyOTPNumber");
const CreateUserOwnByMainUser_1 = require("../../domain-model/usecases/CreateUserOwnByMainUser");
const AttribUserPermission_1 = require("../../domain-model/usecases/AttribUserPermission");
const CreateEnterpiseInfo_1 = require("../../domain-model/usecases/CreateEnterpiseInfo");
const DeleteUser_1 = require("../../domain-model/usecases/DeleteUser");
const BlockOrUnblockUser_1 = require("../../domain-model/usecases/BlockOrUnblockUser");
exports.userMutations = {
    registerMainUser: (root, { input }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new CreateUser_1.CreateUserUseCase(TypeormUserRepo_1.userRepo);
        const result = yield usecase.execute(input);
        return result;
    }),
    createUserOwnByMainUser: (root, { input }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new CreateUserOwnByMainUser_1.CreateUserOwnByMainUserUseCase(TypeormUserRepo_1.userRepo);
        const result = yield usecase.execute(input);
        return result;
    }),
    updateUser: (root, { input }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new UpdateUser_1.UpdateUserUseCase(TypeormUserRepo_1.userRepo);
        const result = yield usecase.execute(input);
        return { success: result };
    }),
    updateUserPassword: (root, { input }) => __awaiter(void 0, void 0, void 0, function* () {
        const interactor = new ChangePassword_1.ChangePasswordUseCase(TypeormUserRepo_1.userRepo);
        return yield interactor.execute(input);
    }),
    attribUserPermission: (root, { input }) => __awaiter(void 0, void 0, void 0, function* () {
        // const usecase = new AttribUserPermission(userRepo);
        // const result= await usecase.execute(input);
        // return result 
    }),
    updateUserPermission: (root, { userId, input }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new AttribUserPermission_1.AttribUserPermission(TypeormUserRepo_1.userRepo);
        const result = yield usecase.execute(userId, input);
        return result;
    }),
    verifyOptNumber: (root, { input }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new VerifyOTPNumber_1.VerifyOTPNumberUseCase(TypeormUserRepo_1.userRepo);
        const result = yield usecase.execute(input);
        return { success: result };
    }),
    createEnterpriseInfo: (root, { input }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new CreateEnterpiseInfo_1.CreateEnterpiseInfoUseCase(TypeormUserRepo_1.userRepo);
        const result = yield usecase.execute(input);
        if (result)
            return input;
    }),
    deleteUser: (root, { input }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new DeleteUser_1.DeleteUserUseCase(TypeormUserRepo_1.userRepo);
        const result = yield usecase.execute(input);
        return { success: result };
    }),
    blockOrUnblockUser: (root, { input }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new BlockOrUnblockUser_1.BlockOrUnblockUser(TypeormUserRepo_1.userRepo);
        const result = yield usecase.execute(input);
        return { success: result };
    }),
    uploadFile: (_, { file, id }) => __awaiter(void 0, void 0, void 0, function* () {
        // const { createReadStream, filename, mimetype, encoding } = await file[0].file;
        // const stream = createReadStream();
        // const newFileName = generateFileName(filename);
        // const input={id:id,image:newFileName}
        // const useCase=new UploadUserImage(userRepo)
        // await useCase.execute(input)
        // const rootDir = path.join(__dirname, '../../../../../');
        // console.log(rootDir)
        // const imagePath = path.join(rootDir,'public','images',newFileName);
        // const writeStream = createWriteStream(imagePath);
        // await stream.pipe(writeStream);
        // return {
        //   name: newFileName,
        //   type: mimetype,
        //   size: 1,
        //   path: imagePath,
        // };
    }),
};
//# sourceMappingURL=user.mutation.js.map