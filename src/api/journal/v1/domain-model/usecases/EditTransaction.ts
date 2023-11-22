import { IJournalRepo } from "../../repository/IJournalRepo";
import { IJournalDto } from "../dto/IjournalDto";


export class EditTransactionUseCase  {

 

  constructor( private repo: IJournalRepo) {
    this.repo = repo
  }

  public async execute(input:IJournalDto[]) {

    // const dto=new UpdateJournalDto(input)

    // const result = await this.repo.EditTransaction(dto.getUpdateInput());

    return ;
  }
}
