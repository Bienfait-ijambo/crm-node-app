import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne, Index } from "typeorm"
import { AccountType } from "./AccountType"
import { Mass } from "./Mass"
import { Journal } from "./Journal"


export enum  AccountStatus{
    ACTIVE=1,
    IN_ACTIVE=0
}
export enum defaultUserId{
    userId=0
}



@Entity()
export class Account  {
     
    @PrimaryGeneratedColumn()
    id: number
    
    @Index({fulltext:true})
    @Column()
    name: string

    @Column()
    code: string

    @Column()
    accountTypeId: number

    @Column()
    massId: number

    @Column()
    status: number

    @Column({
        default:0
    })
    userId: number

    @CreateDateColumn()
    readonly createdAt?: Date;
  
    @UpdateDateColumn()
    readonly updatedAt?: Date;
  
    @DeleteDateColumn()
    readonly deletedAt?: Date;

    @ManyToOne(() => AccountType, accountType => accountType.accounts)
    accountType: AccountType;

    @ManyToOne(() => Mass, mass => mass.account)
    mass: Mass;


    @OneToMany(() => Journal, (journal) => journal.account)
    journals: Journal[]
  


    constructor(name:string,code:string,massId:number,accountTypeId:number, status:number,userId:number){
     this.name=name
     this.code=code
     this.massId=massId
     this.status=status
     this.accountTypeId=accountTypeId
     this.userId=userId
    }

}
