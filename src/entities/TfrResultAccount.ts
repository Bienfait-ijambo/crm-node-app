import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    DeleteDateColumn,
  
    Index,
  } from "typeorm";
import { resultTypeCodeType, resultTypeNameType } from "./Trf";
import { TfrAccount } from "../shared/types/brandTypes";
  
 
  
 /**
  * This table store the result of an operation
  * for example, 
  * account : 60, debit : 100,
  * account : 70 credit : 80
  * The result of this operation is GrossMargin (80): 20 USD
  */
  @Entity()
  export class TfrResultAccount {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    account: number;
  
    /**
     * Journal Transaction Type 
     * @{debit} or {credit}
     */
    @Column()
    transactionType: number;
  
    @Column()
    amount: string;
  
    /**
     *  ResultType reference : @{resultTypeNameType}
     */
    @Column()
    resultType: string;
  
    @Column()
    period: string;
  
    @Column()
    userId: number;
  
    @Index()
    @Column({ type: "date", default: () => "CURRENT_DATE" })
    readonly createdAt?: Date;
  
    @UpdateDateColumn()
    readonly updatedAt?: Date;
  
    @DeleteDateColumn()
    readonly deletedAt?: Date;
  
    constructor(
      account: TfrAccount,
      transactionType: number,
      resultType: resultTypeNameType,
      amount: string,
      period:string,
      userId: number
    ) {
      this.account = account;
      this.transactionType = transactionType;
      this.amount = amount;
      this.userId = userId;
      this.period = period;
      this.resultType = resultType;
    }
  }
  