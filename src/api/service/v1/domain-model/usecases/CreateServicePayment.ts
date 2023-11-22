import { JournalTransactionType } from "../../../../../entities/Journal";
import { enumMassType } from "../../../../../entities/Mass";
import { IJournalDto } from "../../../../journal/v1/domain-model/dto/IjournalDto";
import { IServiceRepo } from "../../repository/IServiceRepo";
import {
  CreateServicePaymentDto,
  paymentServiceStatus,
} from "../dto/CreateServicePaymentDto";

export class CreateServicePaymentUseCase {
  private repo: IServiceRepo;

  constructor(repo: IServiceRepo) {
    this.repo = repo;
  }

  public async execute(journalInput: IJournalDto[]): Promise<void> {
    for (let i = 0; i < journalInput.length; i++) {
      const item = journalInput[i];

      if (
        item.transactionType === JournalTransactionType.DEBIT &&
        item.massId === enumMassType.TRESORERIE_ACTIF
      ) {
        await this.createServicePayment(
          journalInput,
          paymentServiceStatus.GAIN
        );
      } else if (
        item.transactionType === JournalTransactionType.CREDIT &&
        item.massId === enumMassType.TRESORERIE_ACTIF
      ) {
        await this.createServicePayment(
          journalInput,
          paymentServiceStatus.EXPENSE
        );
      }
    }
  }

  private async createServicePayment(
    journalInput: IJournalDto[],
    serviceStatus: number
  ) {
    if (journalInput[0].serviceId > 0) {
      const input = {
        serviceId: journalInput[0].serviceId,
        amount: journalInput[0].amount,
        userId: journalInput[0].userId,
      };

      if ( typeof journalInput[0]?.createdAt === "undefined" || journalInput[0]?.createdAt === "" ) {
  
        const dto = new CreateServicePaymentDto(input);
        await this.repo.createServicePayment(
          dto.getInput_Without_Date(serviceStatus)
        );
      }

      if (this.isValidDate(journalInput[0]?.createdAt)) {
        
        const newInput = {
          createdAt: journalInput[0].createdAt,
          ...input,
        };

        const dto = new CreateServicePaymentDto(newInput);
        await this.repo.createServicePayment( dto.getInput_With_Date(serviceStatus) );
      }
    }
  }

  private isValidDate(input: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    const isValid = regex.test(input);

    if (isValid) {
      return !isNaN(new Date(input).getTime()) ? true : false;
    }

    return false;
  }
}
