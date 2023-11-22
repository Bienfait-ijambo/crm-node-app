import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn, Index } from "typeorm"
import { Account } from "./Account"




@Entity()
export class AggregateAccountAmount  {
     
    @PrimaryGeneratedColumn()
    id: number

    
    @Column() 
    @Index({ unique: false })
    accountId: number

    @Column({
        default:0
    })
    accountType: number


    @Column()
    totalAmount: string


    @Column()
    userId: number

    @CreateDateColumn()
    readonly createdAt?: Date;
  
    @UpdateDateColumn()
    readonly updatedAt?: Date;
  
    @DeleteDateColumn()
    readonly deletedAt?: Date;

    @OneToOne(() => Account)
    @JoinColumn()
    account: Account

    constructor(accountId:number,accountType:number,totalAmount:string,userId:number){
        this.accountId = accountId;
        this.totalAmount = totalAmount;
        this.userId = userId;
        this.accountType = accountType;
    }

}
