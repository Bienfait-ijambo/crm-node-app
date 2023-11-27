import { NextFunction,Response,Request } from "express";
import { GetUserEnterpriseInfoUseCase } from "../../../../user/v1/domain-model/usecases/GetUserEnterpiseInfo";
import { userRepo } from "../../../../user/v1/repository/TypeormUserRepo";
import { createPdfFile } from "../../../../common/pdf/CreatePdfFile";
import { getViewPath } from "../../../../../shared/util/util";
import { getHtmlContent } from "../../../../common/pdf/getHtmlContent";



export class CreateTfrReport {

  static async generatePdf(req: Request, res: Response, next: NextFunction) {
    try {
    //   const startDate = req.query?.startDate;
    //   const enDate = req.query?.endDate;
    //   const page: any = req.query?.page;
    //   const userId = req.query?.userId as string

    //   const input = {
    //     page: parseInt(page),
    //     userId: parseInt(userId),
    //     startDate: startDate,
    //     endDate: enDate,
    //   } as IBalanceReportInput;

     
    //   const dto=new CreateGetBalanceInput(input)


      const [htmlContent,headerData]=await Promise.all([
        getHtmlContent(getViewPath("tfr.html")),
        CreateTfrReport.getUserEnterpiseInfo(1),
       
      ])

      const data = {
        tfrData:[
            {
              style:'non',
                resultType:'MARGE_BRUTE',
                account:70,
                designation:'Vente marchandise',
                debit:null,
                credit:60000
            },
            {
              style:'none',
                resultType:'MARGE_BRUTE',
                account:60,
                designation:'STOCK VENDU',
                debit:50000,
                credit:null
            },
            {
               style:'to_bold',
                resultType:'MARGE_BRUTE',
                account:80,
                designation:'MARGE_BRUTE',
                debit:50000,
                credit:null
            },
            {
              style:'non',
                resultType:'MARGE_BRUTE',
                account:70,
                designation:'Vente marchandise',
                debit:null,
                credit:60000
            },
            {
              style:'none',
                resultType:'MARGE_BRUTE',
                account:60,
                designation:'STOCK VENDU',
                debit:50000,
                credit:null
            },
            {
               style:'to_bold',
                resultType:'MARGE_BRUTE',
                account:80,
                designation:'MARGE_BRUTE',
                debit:50000,
                credit:null
            },
            
            
        ],
       
        headerData:headerData,
        date:{}
      };

      const {clientUrl}=await createPdfFile(htmlContent,data,headerData,'tfr')

      res.send({ message: "file created", status: 200, filePath: clientUrl });
    } catch (error) {

  
      res.status(422).send({ message: "InvalidData" });

    }
  }


 



 

  
  private static async getUserEnterpiseInfo(userId:number){

    const useCase=new GetUserEnterpriseInfoUseCase(userRepo)
    const result = await useCase.execute(userId)
    return result

 
  }





}


