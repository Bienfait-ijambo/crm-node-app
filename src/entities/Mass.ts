import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { Account } from "./Account";

export enum enumMassType {
  ACTIF_IMMOBILISER = 1,
  ACTIF_CIRCULANT = 2,
  TRESORERIE_ACTIF = 3,
  RESOURCES_DURABLE_ET_EMPRUNTS = 4,
  PASSIF_CIRCULANT = 5,
  TRESORERIE_PASSIF = 6,
  CHARGES_EXPLOITATION = 7,
  CHARGES_FINANCIERE=8,
  CHARGES_EXCEPTIONNELLES=9,
  PRODUIT_EXPLOITATION = 10,
  PRODUIT_FINANCIERE=11,
  PRODUIT_EXCEPTIONNELLES=12,
  
}

export const MASSES = [
  {
    id: enumMassType.ACTIF_IMMOBILISER,
    name: "ACTIF_IMMOBILISER",
    status: 1,
  },
  {
    id: enumMassType.ACTIF_CIRCULANT,
    name: "ACTIF_CIRCULANT",
    status: 1,
  },
  {
    id: enumMassType.TRESORERIE_ACTIF,
    name: "TRESORERIE_ACTIF",
    status: 1,
  },
  {
    id: enumMassType.RESOURCES_DURABLE_ET_EMPRUNTS,
    name: "CAPITAUX_PROPRES",
    status: 1,
  },
  {
    id: enumMassType.PASSIF_CIRCULANT,
    name: "PASSIF_CIRCULANT",
    status: 1,
  },
  {
    id: enumMassType.TRESORERIE_PASSIF,
    name: "TRESORERIE_PASSIF",
    status: 1,
  },
  {
    id: enumMassType.CHARGES_EXPLOITATION,
    name: "CHARGES_EXPLOITATION",
    status: 1,
  },
  {
    id: enumMassType.CHARGES_FINANCIERE,
    name: "CHARGES_FINANCIERE",
    status: 1,
  },
  {
    id: enumMassType.CHARGES_EXCEPTIONNELLES,
    name: "CHARGES_EXCEPTIONNELLES",
    status: 1,
  },
  {
    id: enumMassType.PRODUIT_EXPLOITATION,
    name: "PRODUIT_EXPLOITATION",
    status: 1,
  },
  {
    id: enumMassType.PRODUIT_FINANCIERE,
    name: "PRODUIT_FINANCIERE",
    status: 1,
  },
  {
    id: enumMassType.PRODUIT_EXCEPTIONNELLES,
    name: "PRODUIT_EXCEPTIONNELLES",
    status: 1,
  },
];



@Entity()
export class Mass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique:true
  })
  name: string;

  @Column()
  status: number;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;

  @OneToMany(() => Account, (account) => account.mass)
  account: Account[];

  constructor(name: string, status: number) {
    this.name = name;
    this.status = status;
  }
}
