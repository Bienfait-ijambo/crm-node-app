import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { ServicePayment } from "./ServicePayment";

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  name: string;


  @Column({
    nullable: true,
  })
  gainAmount: string;

 

  @Column()
  userId: number;

  @OneToMany(() => ServicePayment, (servicePayment) => servicePayment.service)
  servicePayment: ServicePayment[]
  

  
  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;

  constructor(name: string,userId:number) {
    this.name = name;
    this.userId = userId;
    
  }
}
