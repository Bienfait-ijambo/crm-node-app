import { NextFunction, Request, Response } from "express";
import { getViewPath } from "../../../../../../shared/util/util";
import { GetUserEnterpriseInfoUseCase } from "../../../../../user/v1/domain-model/usecases/GetUserEnterpiseInfo";
import { getHtmlContent } from "../../../../../common/pdf/getHtmlContent";

import { userRepo } from "../../../../../user/v1/repository/TypeormUserRepo";
import { BuildJournalArray } from "./helper/BuildJournalArray";
import { GetJournalPdfData } from "../../../domain-model/usecases/GetJournalPdfData";
import { journalRepo } from "../../../repository/TypeormJournalRepo";
import { IJournalReportInput } from "../../../domain-model/usecases/interfaces/journalInterfaces";
import { createPdfFile } from "../../../../../common/pdf/CreatePdfFile";

export class CreateJournalReport extends BuildJournalArray {


  async getPdf(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as any;

      const {input,journalName} = this.getInput(query);

    
      const [journalData,htmlContent,headerData] = await Promise.all([
        this.getJournalData(input),
        getHtmlContent(getViewPath("journal.html")),
        this.getUserEnterpiseInfo(input.userId)
      ])

      const data = {
        journalData: journalData,
        headerData: headerData,
        date: input,
        journalName:journalName
      };


      const {clientUrl}=await createPdfFile(htmlContent,data,headerData,'journal')

      res.send({ message: "file created", status: 200, filePath: clientUrl });
      
    } catch (error) {
      res.status(422).send({ message: "InvalidData" });
    }
  }

  private async getJournalData(input: IJournalReportInput) {
    const usecase = new GetJournalPdfData(journalRepo);
    const result: any[] = await usecase.execute(input);
    const data = this.getJournalTransformData(result);
    return data;
  }

  private async getUserEnterpiseInfo(userId: number) {
    const useCase = new GetUserEnterpriseInfoUseCase(userRepo);
    const result = await useCase.execute(userId);
    return result;
  }


  

  private getInput(query: any) {
    const { startDate, endDate, page, userId, projectId, serviceId,journalName } = query;

    const input = {
      page: parseInt(page),
      userId: parseInt(userId),
      startDate: startDate,
      endDate: endDate,
      projectId: parseInt(projectId),
      serviceId: parseInt(serviceId),
      journalName: journalName,
    } as IJournalReportInput;

    if (parseInt(projectId) > 0) {
      return {input,journalName:`PROJET : ${journalName}`};
    }

    if (parseInt(serviceId) > 0) {
      return {input,journalName:`SERVICE : ${journalName}`};
    }

    return {input,journalName:''};
  }
}
