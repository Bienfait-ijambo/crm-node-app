import { NextFunction, Request, Response } from "express";
import { journalRepo } from "../../../repository/TypeormJournalRepo";
import { DeleteTransactionUseCase } from "../../../domain-model/usecases/DeleteTransaction";
import { IDeleteTransaction } from "../../../domain-model/dto/DeleteTransactionDto";

export class DeleteTransaction{


  
  static async execute(req: Request, res: Response, next: NextFunction) {
    try {
  
        const transactionCode=req?.body?.transactionCode as string
        const userId=req?.body?.userId as string
        const input={
            userId:parseInt(userId),
            transactionCode:transactionCode
        } as IDeleteTransaction

       const useCase=new DeleteTransactionUseCase(journalRepo)
       await useCase.execute(input)

     
      res.status(200).send({ message: "Transaction supprimer avec succès !", success:true });
      
    } catch (error) {
        // next(error);
      res.status(422).send({ message: error.message, success: false });
    }
  }
}
