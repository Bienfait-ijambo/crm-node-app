import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, OneToMany } from "typeorm"

export enum EnumClientPages{
    JOURNAL=1,
    BILAN=2,
    BALANCE=3,
    PROJET=4,
    SERVICE=5,
    USERS=6,
    DASHBOARD=7,
    PARTNER=8,
    ACCOUNT=9,
    ACCOUNT_RESULT=10,
    GENERAL_LEDGER=11,

}



@Entity()
export class clientPages  {
     
    @PrimaryGeneratedColumn()
    id: number

  
    @Column('json')
    pageName: JSON


    @CreateDateColumn()
    readonly createdAt?: Date;
  
    @UpdateDateColumn()
    readonly updatedAt?: Date;
  
    @DeleteDateColumn()
    readonly deletedAt?: Date;

}


