import { NextFunction, Request, Response } from "express";
import { getViewPath } from "../../../../../../shared/util/util";
import { createPdfFile } from "../../../../../common/pdf/CreatePdfFile";
import { getHtmlContent } from "../../../../../common/pdf/getHtmlContent";
import { singleAccountResultTestData } from "../test-data/singleAccountTransaction";
import { ProcessSingleAccountTransaction } from "./helper/processor/processSingleAccountTransactions";

export class CreateSingleAccountReport {
  static async generatePdf(req: Request, res: Response, next: NextFunction) {
    try {
      //   const {input,journalName} = this.getInput(req);

      const [journalData, htmlContent, headerData] = await Promise.all([
        // this.getJournalData(input),
        {},
        getHtmlContent(getViewPath("singleAccountReport.html")),
        // this.getUserEnterpiseInfo(input.userId)
        {},
      ]);

      const accounT = ProcessSingleAccountTransaction.execute(
        singleAccountResultTestData
      );

      const data = {
        accountData: accounT,

        accountSold: [
          {
            debit: {
              amount: "500 (SD)",
            },
            credit: {
              amount: "500 (",
            },
          },
        ],
        headerData: {},

        // journalName:journalName
      };

      const { clientUrl } = await createPdfFile(
        htmlContent,
        data,
        headerData as any,
        "singleAccountReport"
      );

      res.send({ message: "file created", status: 200, filePath: clientUrl });
    } catch (error) {
      res
        .status(422)
        .send({ message: `error : ${error.message}-${error.stack}` });
    }
  }

  //   private async getJournalData(input: IJournalReportInput) {
  //     const usecase = new GetJournalPdfData(journalRepo);
  //     const result: any[] = await usecase.execute(input);
  //     const data = this.getJournalTransformData(result);
  //     return data;
  //   }

  //   private async getUserEnterpiseInfo(userId: number) {
  //     const useCase = new GetUserEnterpriseInfoUseCase(userRepo);
  //     const result = await useCase.execute(userId);
  //     return result;
  //   }

  //   private getInput(req: Request) {
  //     const { startDate, endDate, page, userId, projectId, serviceId,journalName } = req.query as any;

  //     const input = {
  //       page: parseInt(page),
  //       userId: parseInt(userId),
  //       startDate: startDate,
  //       endDate: endDate,
  //       projectId: parseInt(projectId),
  //       serviceId: parseInt(serviceId),
  //       journalName: journalName,
  //     } as IJournalReportInput;

  //     if (parseInt(projectId) > 0) {
  //       return {input,journalName:`PROJET : ${journalName}`};
  //     }

  //     if (parseInt(serviceId) > 0) {
  //       return {input,journalName:`SERVICE : ${journalName}`};
  //     }

  //     return {input,journalName:''};
  //   }
}
