import { CreateUserUseCase } from "../../domain-model/usecases/CreateUser";
import { userRepo } from "../../repository/TypeormUserRepo";
import { ChangePasswordUseCase } from "../../domain-model/usecases/ChangePassword";
import { UpdateUserUseCase } from "../../domain-model/usecases/UpdateUser";
import { VerifyOTPNumberUseCase } from "../../domain-model/usecases/VerifyOTPNumber";
import { CreateUserOwnByMainUserUseCase } from "../../domain-model/usecases/CreateUserOwnByMainUser";
import { AttribUserPermission } from "../../domain-model/usecases/AttribUserPermission";
import { CreateEnterpiseInfoUseCase } from "../../domain-model/usecases/CreateEnterpiseInfo";
import { DeleteUserUseCase } from "../../domain-model/usecases/DeleteUser";
import { BlockOrUnblockUser } from "../../domain-model/usecases/BlockOrUnblockUser";

export const userMutations = {
  registerMainUser: async (root, { input }) => {
    const usecase = new CreateUserUseCase(userRepo);
    const result = await  usecase.execute(input);
    return result
  },

  createUserOwnByMainUser: async (root, { input }) => {
    const usecase = new CreateUserOwnByMainUserUseCase(userRepo);
    const result = await  usecase.execute(input);
    return result
  },

  updateUser: async (root, { input }) => {
    const usecase = new UpdateUserUseCase(userRepo);
    const result= await usecase.execute(input);
    return {success:result} 
  },
  updateUserPassword: async (root, { input }) => {
    const interactor = new ChangePasswordUseCase(userRepo);
    return await interactor.execute(input);
   
  },

  attribUserPermission: async (root, { input }) => {
    // const usecase = new AttribUserPermission(userRepo);
    // const result= await usecase.execute(input);
    // return result 
   
  },

  updateUserPermission: async (root, { userId,input }) => {
    const usecase = new AttribUserPermission(userRepo);
    const result= await usecase.execute(userId,input);
    return result 
   
  },

  verifyOptNumber: async (root, { input }) => {
    const usecase = new VerifyOTPNumberUseCase(userRepo);
    const result= await usecase.execute(input);
    return {success:result}
  },

  createEnterpriseInfo: async (root, { input }) => {
    const usecase = new CreateEnterpiseInfoUseCase(userRepo);
    const result= await usecase.execute(input);
    if (result) return input
  },


  deleteUser: async (root, { input }) => {
    const usecase = new DeleteUserUseCase(userRepo);
    const result= await usecase.execute(input);
   return {success:result}
  },
  
  blockOrUnblockUser: async (root, {input }) => {
    const usecase = new BlockOrUnblockUser(userRepo);
    const result= await usecase.execute(input);
   return {success:result}
  },
  
  

  

 

  
  
  uploadFile: async (_, { file,id }) => {
  
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
  },
};



