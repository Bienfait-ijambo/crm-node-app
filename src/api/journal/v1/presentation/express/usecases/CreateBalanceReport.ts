import { NextFunction,Response,Request } from "express";
import { IBalanceReportInput } from "../../../domain-model/usecases/interfaces/journalInterfaces";
import { CreateGetBalanceInput } from "../../../domain-model/dto/CreateBalanceInput";
import { catchError } from "../../../../../../shared/exceptions/CachError";
import { getViewPath } from "../../../../../../shared/util/util";
import { userRepo } from "../../../../../user/v1/repository/TypeormUserRepo";
import { GetBalanceUseCase } from "../../../domain-model/usecases/GetBalance";
import { journalRepo } from "../../../repository/TypeormJournalRepo";
import { GetUserEnterpriseInfoUseCase } from "../../../../../user/v1/domain-model/usecases/GetUserEnterpiseInfo";
import {  getHtmlContent } from "../../../../../common/pdf/getHtmlContent";
import { createPdfFile } from "../../../../../common/pdf/CreatePdfFile";



export class CreateBalanceReport {

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
      } as IBalanceReportInput;

     
      const dto=new CreateGetBalanceInput(input)

      const {transactions,debitAmount,creditAmount} = await CreateBalanceReport.getBalanceData(dto.getBilanInput());

      const htmlContent = await getHtmlContent(getViewPath("balance.html"));

      const headerData=await CreateBalanceReport.getUserEnterpiseInfo(input.userId)

      const data = {
        transactions:transactions,
        debitAmount:debitAmount,
        creditAmount:creditAmount,
        headerData:headerData,
        date:input
      };

      const {clientUrl}=await createPdfFile(htmlContent,data,headerData,'balance')

      res.send({ message: "file created", status: 200, filePath: clientUrl });
    } catch (error) {

  
      res.status(422).send({ message: "InvalidData" });

    }
  }


 



  @catchError
  private static async getBalanceData(input: IBalanceReportInput) {
    const useCase = new GetBalanceUseCase(journalRepo);
    const { journals } = await useCase.execute(input);

    const transactions=journals.map((item:any)=>{
        
        const sold=item.totalIncome > item.totalExpense ? '(SD)':'(SC)'

        const finalSold=(item.totalIncome - item.totalExpense ).toFixed(2) 

        return {
         accountCode: item.accountCode,
         accountName: item.accountName,
         accountType: item.accountType,
         massName: item.massName,
         totalIncome: item.totalIncome==0 ? '--': item.totalIncome.toFixed(2),
         totalExpense: item.totalExpense==0 ? '--': item.totalExpense.toFixed(2),
         finalSold:finalSold +' ' +sold
       
        }
      })

      const debitAmount=CreateBalanceReport.getTotalDebitAmount(journals)
      const creditAmount=CreateBalanceReport.getTotalCreditAmount(journals)


    return {transactions,debitAmount,creditAmount};
  }

  
  private static async getUserEnterpiseInfo(userId:number){

    const useCase=new GetUserEnterpriseInfoUseCase(userRepo)
    const result = await useCase.execute(userId)
    return result

 
  }




  private static  getTotalDebitAmount(arr:any):string{
    let amount=0
    for (let i = 0; i < arr.length; i++) {
      amount += arr[i].totalIncome;
    }
    return amount.toFixed(2)
  }
  
  private static  getTotalCreditAmount(arr:any):string{
    let amount=0
    for (let i = 0; i < arr.length; i++) {
      amount += arr[i].totalExpense;
    }
    return amount.toFixed(2)
  }

}


