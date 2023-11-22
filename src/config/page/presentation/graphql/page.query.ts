import { pageRepo } from "../../typeorm/TypeormPageRepo";
import { GetClientPagesUseCase } from "../../usecases/getClientPages";

export const pageQuery = {
  pages: async (parent, args, info) => {
    const usecase = new GetClientPagesUseCase(pageRepo);
    const result = await usecase.execute();
    return result;
  },
};
