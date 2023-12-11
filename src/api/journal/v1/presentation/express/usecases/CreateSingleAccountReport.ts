import { NextFunction, Request, Response } from "express";
import { getViewPath } from "../../../../../../shared/util/util";
import { createPdfFile } from "../../../../../common/pdf/CreatePdfFile";
import { getHtmlContent } from "../../../../../common/pdf/getHtmlContent";
import { ProcessSingleAccountTransaction } from "./helper/processor/processSingleAccountTransactions";
import { GetUserEnterpriseInfoUseCase } from "../../../../../user/v1/domain-model/usecases/GetUserEnterpiseInfo";
import { userRepo } from "../../../../../user/v1/repository/TypeormUserRepo";
import { GetTransactionDetailByAccount } from "../../../domain-model/usecases/GetTransactionDetailByAccount";
import { journalRepo } from "../../../repository/TypeormJournalRepo";
import { ITransactionDetailInput } from "../../../domain-model/usecases/interfaces/journalInterfaces";
import { CreateTransactionDetailByAccountDto } from "../../../domain-model/dto/CreateTransactionDetailByAccountDto";

export class CreateSingleAccountReport {

  
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const input = this.getInput(req);

      const dto = new CreateTransactionDetailByAccountDto(input);

      await dto.validate();

      const [accountTransactions, htmlContent, headerData] = await Promise.all([
        this.getTransactionDetailByAccount(dto.getInput()),
        getHtmlContent(getViewPath("singleAccountReport.html")),
        this.getUserEnterpiseInfo(input.userId),
      ])

      const processor = new ProcessSingleAccountTransaction(
        accountTransactions
      );

      const { transactions, accountSold } = await processor.execute();

      const data = {
        accountData: transactions,
        accountSold: accountSold,
        headerData: headerData,
        date:input,
        account:input
      };

      const { clientUrl } = await createPdfFile(
        htmlContent,
        data,
        headerData,
        "singleAccountReport"
      );

      res.send({ message: "file created", status: 200, filePath: clientUrl });
    } catch (error) {
      res.status(422).send({ message: `error : ${error.message}` });
    }
  }

  private async getTransactionDetailByAccount(input: ITransactionDetailInput) {
    const usecase = new GetTransactionDetailByAccount(journalRepo);
    const result = await usecase.execute(input);
    return result;
  }

  private async getUserEnterpiseInfo(userId: number) {
    const useCase = new GetUserEnterpriseInfoUseCase(userRepo);
    const result = await useCase.execute(userId);
    return result;
  }

  private getInput(req: Request) {
    const { startDate, endDate, userId, accountId, page,accountName,accountCode } = req.query as any;

    const input = {
      userId: parseInt(userId),
      startDate: startDate,
      endDate: endDate,
      accountId: parseInt(accountId),
      accountCode:req.query?.accountCode,
      accountName:accountName,
      page: page,
    } as ITransactionDetailInput;

    return input;
  }
}
