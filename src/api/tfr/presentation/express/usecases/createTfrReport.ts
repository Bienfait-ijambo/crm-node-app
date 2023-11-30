import { NextFunction,Response,Request } from "express";
import { GetUserEnterpriseInfoUseCase } from "../../../../user/v1/domain-model/usecases/GetUserEnterpiseInfo";
import { userRepo } from "../../../../user/v1/repository/TypeormUserRepo";
import { createPdfFile } from "../../../../common/pdf/CreatePdfFile";
import { getViewPath } from "../../../../../shared/util/util";
import { getHtmlContent } from "../../../../common/pdf/getHtmlContent";
import { GetTfrDataUseCase } from "../../../domain-model/usecases/getTfrData";
import { tfrRepo } from "../../../repository/TypeormTFRRepo";
import { IGetTfrDataInput } from "../../../domain-model/usecases/interfaces/tfr.interfaces";
import { CreateGetTFRDataInput } from "../../../domain-model/dto/createGetTfrDataInput";
import { AggregateTfrProcessedData } from "./helpers/aggregateProcessedTfrData";




export class CreateTfrReport {

  private static getInputFromRequest(req:Request){

    const period = req.query?.period;
      const userId = req.query?.userId as string;

      const input = {
        userId: parseInt(userId),
        period: period,
      } as IGetTfrDataInput;
      return input

  }

  
  static async generatePdf(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = new CreateGetTFRDataInput(CreateTfrReport.getInputFromRequest(req));

      await dto.validate();

      const [htmlContent,headerData,tfrData]=await Promise.all([
        getHtmlContent(getViewPath("tfr.html")),
        CreateTfrReport.getUserEnterpiseInfo(1),
        CreateTfrReport.getTfrData(dto.getInput())
       
      ])
      const process=new AggregateTfrProcessedData(tfrData)
      const data = {
        tfrData:process.execute(),
        headerData:headerData,
        date:{}
      };

      const {clientUrl}=await createPdfFile(htmlContent,data,headerData,'tfr')

      res.send({ message: "file created", status: 200, filePath: clientUrl });
    } catch (error) {

  
      res.status(422).send({ message: "InvalidData" });

    }
  }



  private static async getTfrData(input:IGetTfrDataInput){
    const useCase=new GetTfrDataUseCase(tfrRepo)
    const result=await useCase.execute(input)
    return result
  }
 



 

  
  private static async getUserEnterpiseInfo(userId:number){

    const useCase=new GetUserEnterpriseInfoUseCase(userRepo)
    const result = await useCase.execute(userId)
    return result

 
  }





}


