import { userRepo } from "../../repository/TypeormUserRepo";
import { GetUserUseCase } from "../../domain-model/usecases/GetUser";
import { GetUsersUserCase } from "../../domain-model/usecases/GetUsers";
import { Roles } from "../../domain-model/domain/Role";
import { GetSubscribers } from "../../domain-model/usecases/GetSubscribers";

export const userQueries = {
  users: async (root, { userName, userCode, page }) => {
    const input = { userName, userCode };

    const usecase = new GetUsersUserCase(userRepo);
    const {  users,count, totalPages } = await usecase.execute(input, page);
    return { users, count, totalPages };
  },
  user: async (root, { id }, { token }) => {
    const usecase = new GetUserUseCase(userRepo);
    return await usecase.execute(id);
  },
  roles: async (root, { id }, { token }) => {
    const roles = new Roles();
    return roles.getRoles();
  },

  getSubscribers: async (root, { userCode }, { token }) => {
    const usecase = new GetSubscribers(userRepo);
    return usecase.getSubscribers(userCode);
  },
  

  getSubscribeUsersByCode: async (root, { userCode }, { token }) => {
    const usecase = new GetSubscribers(userRepo);
    const result= usecase.getSubscribeUsersByCode(userCode);
    return result
  },


};
