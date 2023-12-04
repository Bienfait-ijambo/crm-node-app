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
    code: string;

    @Column()
    userId: number;
  
    @Index()
    @Column({ type: "date"})
    readonly createdAt?: Date;
  
    @UpdateDateColumn()
    readonly updatedAt?: Date;
  
    @DeleteDateColumn()
    readonly deletedAt?: Date;
  
    constructor(
      name:string,
      resultDate:string,
      status:number,
      code:string,
      userId: number
    ) {
      this.name=name
      this.code=code
      this.resultDate=resultDate
      this.status=status
      this.userId=userId
    }
  }
  