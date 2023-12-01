import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    DeleteDateColumn,
    Index,
  } from "typeorm";



  @Entity()
  export class PeriodicTfrResult {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    resultDate: string;

    @Column()
    status: number;

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
      name:string,
      resultDate:string,
      status:number,
      userId: number
    ) {
      this.name=name
      this.resultDate=resultDate
      this.status=status
      this.userId=userId
    }
  }
  