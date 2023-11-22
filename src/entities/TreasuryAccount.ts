import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"




@Entity()
export class TreasuryAccount  {
     
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    accountId: number


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


}
