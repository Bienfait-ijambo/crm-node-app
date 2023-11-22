import { NextFunction, Response, Request } from "express";
import { GetBilanUseCase } from "../../../domain-model/usecases/GetBilan";
import { TypeRepo } from "../../../repository/TypeormTypeRepo";
import { getActifMasses, getPassifMasses } from "../helper/bilanHelper";

import { IBilanInput } from "../../../domain-model/usecases/interfaces/typeInterfaces";
import { catchError } from "../../../../../../shared/exceptions/CachError";
import { getViewPath } from "../../../../../../shared/util/util";
import {  userRepo } from "../../../../../user/v1/repository/TypeormUserRepo";
import { GetUserEnterpriseInfoUseCase } from "../../../../../user/v1/domain-model/usecases/GetUserEnterpiseInfo";
import { createPdfFile } from "../../../../../common/pdf/CreatePdfFile";
import { getHtmlContent } from "../../../../../common/pdf/getHtmlContent";
import { CreateBilanInput } from "../../../domain-model/dto/CreateBilanInput";

export class CreateBilanPdf {

  static async getPdf(req: Request, res: Response, next: NextFunction) {
    try {
      const startDate = req.query.startDate;
      const enDate = req.query.endDate;
      const page: any = req.query.page;
      const userId: any = req.query.userId;

      const input = {
        page: parseInt(page),
        userId: parseInt(userId.toString()),
        startDate: startDate,
        endDate: enDate,
      } as IBilanInput;

     
      const dto=new CreateBilanInput(input)
      // const outPut
    
      const masses = await CreateBilanPdf.getBilanData(dto.getInput());

      const htmlContent = await getHtmlContent(getViewPath("bilan.html"));

      const headerData=await CreateBilanPdf.getUserEnterpiseInfo(input.userId)

      const data = {
        actifMasses: getActifMasses(masses),
        passifMasses: getPassifMasses(masses),
        headerData:headerData,
        date:input
      };

      const {clientUrl}=await createPdfFile(htmlContent,data,headerData,'bilan')

      res.send({ message: "file created", status: 200, filePath: clientUrl });
    } catch (error) {
      res.status(422).send({ message: "InvalidData" });

    }
  }



  @catchError
  private static async getBilanData(input: IBilanInput) {
    const useCase = new GetBilanUseCase(TypeRepo);
    const { masses } = await useCase.execute(input);
    return masses;
  }

  private static async getUserEnterpiseInfo(userId:number){

    const useCase=new GetUserEnterpriseInfoUseCase(userRepo)
    const result = await useCase.execute(userId)
    return result
  
  }


 
}