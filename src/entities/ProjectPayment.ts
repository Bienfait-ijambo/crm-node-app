import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm"
import { Project } from "./Project"



@Entity()
export class ProjectPayment {
     
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    projectId: number

    @Column()
    amount: string

    @Column()
    userId: number


   
    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    readonly createdAt?: Date;
  
    @UpdateDateColumn()
    readonly updatedAt?: Date;
  
    @DeleteDateColumn()
    readonly deletedAt?: Date;

    @ManyToOne(() => Project, project => project.projectPayment)
    project: Project;


    constructor(projectId:number,amount:string,userId:number){
    this.projectId =projectId;
    this.amount =amount;
    this.userId =userId;

    }

}
