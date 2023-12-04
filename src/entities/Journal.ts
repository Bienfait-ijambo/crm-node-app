import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, DeleteDateColumn, JoinTable, ManyToMany, ManyToOne, Index } from "typeorm"
import { Account } from "./Account"
import { Project } from "./Project"
import { Service } from "./Service"


/**
 * Transaction can be debit or credit
 */
export enum JournalTransactionType {
    DEBIT = 1,
    CREDIT = 2,
  }
  

  
export const journalTransaction = [
    {
      name: 'DEBIT',
      val: 1,
    },
    {
      name: 'CREDIT',
      val: 2,
    },
  ] as const
  
  export type journalTransactionNameType=typeof journalTransaction[number]['name']
  export type journalTransactionValType=typeof journalTransaction[number]['val']

@Entity()
export class Journal  {
     
    @PrimaryGeneratedColumn()
    id: number

 
    @Column()
    accountId: number

    @Column()
    description: string

    @Column({
        default:0
    })
    projectId: number

    @Column({
        default:0
    })
    serviceId: number

    @Column()
    amount: string

    @Column()
    transactionType: number

    @Column()
    income: string

    @Column()
    expense: string

    @Column()
    draw: boolean

    @Column()
    transactionCode: string

    @Column()
    userId: number

    @Index()
    @Column({ type: 'date' })
    readonly createdAt?: Date;
  
    @UpdateDateColumn()
    readonly updatedAt?: Date;
  
    @DeleteDateColumn()
    readonly deletedAt?: Date;

    
    @ManyToOne(() => Account, (account) => account.journals)
    account: Account

  

    @ManyToMany(() => Project)
    @JoinTable()
    projects: Project[]

    @ManyToMany(() => Service)
    @JoinTable()
    services: Service[]

    constructor(accountId:number,description:string,projectId:number,serviceId:number,amount:string,
        transactionType:number,income:string,expense:string,draw:boolean,userId:number){
            this.accountId = accountId;
            this.description = description;
            this.projectId = projectId;
            this.serviceId = serviceId;
            this.amount = amount;
            this.transactionType = transactionType;
            this.income = income;
            this.transactionType   = transactionType;
            this.expense = expense;
            this.userId = userId
            this.draw=  draw;
        
    }


}
