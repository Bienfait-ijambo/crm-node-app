import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, DeleteDateColumn, JoinTable, ManyToMany, ManyToOne, Index } from "typeorm"

/**
 * Tableau de formation de résultat
 */
@Entity()
export class Tfr  {
     
    @PrimaryGeneratedColumn()
    id: number

 
    @Column()
    accountId: number

    @Column()
    transactionType: number

    @Column()
    amount: string

    @Column()
    userId: number

    @Index()
    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    readonly createdAt?: Date;
  
    @UpdateDateColumn()
    readonly updatedAt?: Date;
  
    @DeleteDateColumn()
    readonly deletedAt?: Date;

    

    constructor(accountId:number,transactionType:number,amount:string,userId:number){
            this.accountId = accountId;
            this.transactionType=transactionType
            this.amount = amount
            this.userId = userId
        
    }


}
