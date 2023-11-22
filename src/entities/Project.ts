import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, OneToOne, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm"
import { Partner } from "./Partner"
import { Journal } from "./Journal"
import { ProjectPayment } from "./ProjectPayment"
export enum ProjectStatus{
    PENDING=0,
    FINISHED=1
}

@Entity()
export class Project  {
     
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    designation: string

    @Column()
    amount: string

    @Column({
        nullable:true
    })
    paidAmount: string

    @Column()
    partnerId: number

    @Column()
    status: number

    

    @Column()
    userId: number

    @CreateDateColumn()
    readonly createdAt?: Date;
  
    @UpdateDateColumn()
    readonly updatedAt?: Date;
  
    @DeleteDateColumn()
    readonly deletedAt?: Date;

    
    @ManyToOne(() => Partner, (partner) => partner.projects)
    partner: Partner

    // @OneToMany(() => Journal, (journal) => journal.project)
    // journals: Journal[]


    @OneToMany(() => ProjectPayment, (projectPayement) => projectPayement.project)
    projectPayment: ProjectPayment[]

    constructor(designation: string,amount:string,paidAmount:string, partnerId: number, userId: number,status:number){
        this.designation =designation
        this.amount =amount
        this.partnerId = partnerId
        this.paidAmount =paidAmount
        this.status=status
        this.userId = userId
        
    }


}
