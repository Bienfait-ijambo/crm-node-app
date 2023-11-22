import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";
import { Service } from "./Service";

@Entity()
export class ServicePayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serviceId: number;

  @Column()
  amount: string;

  @Column()
  userId: number;

  @Column({
    default: 0,
  })
  status: number;

  @Column({ type: "date", default: () => "CURRENT_DATE" })
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;


  
  @ManyToOne(() => Service, (service) => service.servicePayment)
  service: Service

  constructor(
    serviceId: number,
    amount: string,
    userId: number,
    status: number,
    createdAt:Date
  ) {
    this.serviceId = serviceId;
    this.amount = amount;
    this.userId = userId;
    this.status = status;
    this.createdAt = createdAt;
  }
}
