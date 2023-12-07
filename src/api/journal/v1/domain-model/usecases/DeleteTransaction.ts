import { IJournalRepo } from "../../repository/IJournalRepo";
import {
  DeleteTransactionDto,
  IDeleteTransaction,
} from "../dto/DeleteTransactionDto";

export class DeleteTransactionUseCase {
  constructor(private repo: IJournalRepo) {
    this.repo = repo;
  }

  async execute(input: IDeleteTransaction) {
    try {
      const dto = new DeleteTransactionDto(input);
      await dto.validate();
      const result = await this.repo.deleteTransaction(input);
      if (result) return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
