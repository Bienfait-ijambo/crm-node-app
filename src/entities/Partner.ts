import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm"
import { Project } from "./Project"


@Entity()
export class Partner  {
     
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @Column()
    email:string

    @Column()
    telephone:string

    @Column()
    userId: number

    @CreateDateColumn()
    readonly createdAt?: Date;
  
    @UpdateDateColumn()
    readonly updatedAt?: Date;
  
    @DeleteDateColumn()
    readonly deletedAt?: Date;

    @OneToMany(() => Project, (project) => project.partner)
    projects: Project[]


    constructor(name:string, email:string, telephone:string,userId:number){
        this.name = name;
        this.email = email;
        this.telephone =telephone
        this.userId = userId
    }

}
