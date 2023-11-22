import { NextFunction, Response, Request } from "express";
import { TypeRepo } from "../../../repository/TypeormTypeRepo";

import { ICreateAccountResultInput } from "../../../domain-model/usecases/interfaces/typeInterfaces";
import { catchError } from "../../../../../../shared/exceptions/CachError";
import { getViewPath } from "../../../../../../shared/util/util";
import { userRepo } from "../../../../../user/v1/repository/TypeormUserRepo";
import { GetUserEnterpriseInfoUseCase } from "../../../../../user/v1/domain-model/usecases/GetUserEnterpiseInfo";
import { createPdfFile } from "../../../../../common/pdf/CreatePdfFile";
import { getHtmlContent } from "../../../../../common/pdf/getHtmlContent";
import { CreateAccountResultUseCase } from "../../../domain-model/usecases/CreateAccountResult";
import { CreateAccountResultInput } from "../../../domain-model/dto/CreateAccountResultInput";
import {
  IAccountResult,
  getChargeAccount,
  getProduitAccount,
  totalChargeAndProductAmount,
} from "../helper/accountResultHelper";
import { logErrorToFile } from "../../../../../../infrastructure/graphql-server/winston/logger";

export class CreateAccountResultPdf {
 private static createInputFromRequest(req: Request){
    const startDate = req.query?.startDate;
    const enDate = req.query?.endDate;
    const page = req.query?.page as string;
    const userId = req.query?.userId as string;

    return {
      page: parseInt(page),
      userId: parseInt(userId.toString()),
      startDate: startDate,
      endDate: enDate,
    } as ICreateAccountResultInput;

  }
  static async getPdf(req: Request, res: Response, next: NextFunction) {
    try {
      
      const input=CreateAccountResultPdf.createInputFromRequest(req)

      const dto = new CreateAccountResultInput(input);

      const [masses, htmlContent, headerData] = await Promise.all([
        CreateAccountResultPdf.getAccountResultData(dto.getInput()),
        getHtmlContent(getViewPath("accountResult.html")),
        CreateAccountResultPdf.getUserEnterpiseInfo(input.userId),
      ]);

      const { chargeAccounts, produitAccounts, result } =
        await CreateAccountResultPdf.getAcccountResult(masses);

      const data = {
        chargeAccounts: chargeAccounts,
        produitAccounts: produitAccounts,
        result: result,
        headerData: headerData,
        date: input,
      };

      const { clientUrl } = await createPdfFile(
        htmlContent,
        data,
        headerData,
        "accountResult"
      );

      res.send({ message: "file created", status: 200, filePath: clientUrl });
    } catch (error) {
      res.status(422).send({ message: "InvalidData" });
    }
  }

  private static getAcccountResult(masses: any) {
    try {
      const chargeAccounts = getChargeAccount(masses);
      const produitAccounts = getProduitAccount(masses);
      const accountAmount = totalChargeAndProductAmount;
      return new Promise<{chargeAccounts:IAccountResult[],produitAccounts:IAccountResult[],result:string}>((resolve) => {
        const result =
          accountAmount.totalProduitAmount > accountAmount.totalChargeAmount
            ? "Benefice : " +
              (accountAmount.totalProduitAmount -
                accountAmount.totalChargeAmount)
            : "Perte : " +
              (accountAmount.totalChargeAmount -
                accountAmount.totalProduitAmount);

        resolve({ chargeAccounts, produitAccounts, result });
      });
    } catch (error) {
      logErrorToFile( "Error while creating account-result-pdf", "account-result-pdf-error" );
    }
  }

  @catchError
  private static async getAccountResultData(input: ICreateAccountResultInput) {
    const useCase = new CreateAccountResultUseCase(TypeRepo);
    const { masses } = await useCase.execute(input);
    return masses;
  }

  private static async getUserEnterpiseInfo(userId: number) {
    const useCase = new GetUserEnterpriseInfoUseCase(userRepo);
    const result = await useCase.execute(userId);
    return result;
  }
}
