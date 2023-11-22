import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Mass, enumMassType } from "./Mass";
import { Account } from "./Account";

export enum enumAccountType {
  ACTIF = 1,
  PASSIF = 2,
  PRODUIT = 3,
  CHARGES = 4,
  
}


export const ACCOUNT_TYPE_SEED_DATA = [
  {
    id: enumAccountType.ACTIF,
    name: "ACTIF",
    status: 1,
  },
  {
    id: enumAccountType.PASSIF,
    name: "PASSIF",
    status: 1,
  },
  {
    id: enumAccountType.PRODUIT,
    name: "PRODUIT",
    status: 1,
  },
  {
    id: enumAccountType.CHARGES,
    name: "CHARGES",
    status: 1,
  },
];



/**
 * accountType with masses
 */
export const existingAccountTypes = [
  {
    id: enumAccountType.ACTIF,
    name: "ACTIF",
    masses: [
      { id: enumMassType.ACTIF_IMMOBILISER, name: "ACTIF_IMMOBILISER" },
      {
        id: enumMassType.ACTIF_CIRCULANT,
        name: "ACTIF_CIRCULANT",
      },
      {
        id: enumMassType.TRESORERIE_ACTIF,
        name: "TRESORERIE_ACTIF",
      },
    ],
  },
  {
    id: enumAccountType.PASSIF,
    name: "PASSIF",
    masses: [
      { id: enumMassType.RESOURCES_DURABLE_ET_EMPRUNTS, name: "CAPITAUX_PROPRES" },
      {
        id: enumMassType.PASSIF_CIRCULANT,
        name: "PASSIF_CIRCULANT",
      },
      {
        id: enumMassType.TRESORERIE_PASSIF,
        name: "TRESORERIE_PASSIF",
      },
    ],
  },
  {
    id: enumAccountType.PRODUIT,
    name: "PRODUIT",
    masses: [
      {
        id: enumMassType.PRODUIT_EXPLOITATION,
        name: "PRODUIT_EXPLOITATION",
      },
      {
        id: enumMassType.PRODUIT_EXCEPTIONNELLES,
        name: "PRODUIT_EXCEPTIONNELLES",
      },
      {
        id: enumMassType.PRODUIT_FINANCIERE,
        name: "PRODUIT_FINANCIERE",
      },
    ],
  },
  {
    id: enumAccountType.CHARGES,
    name: "CHARGE",
    masses: [
      {
        id: enumMassType.CHARGES_EXPLOITATION,
        name: "CHARGE_EXPLOITATION",
      },
      {
        id: enumMassType.CHARGES_FINANCIERE,
        name: "CHARGE_FINANCIERE",
      },
      {
        id: enumMassType.CHARGES_EXCEPTIONNELLES,
        name: "CHARGE_EXCEPTIONNELLES",
      }
    ],
  },
];

@Entity()
export class AccountType {
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

  @ManyToMany(() => Mass)
  @JoinTable()
  masses: Mass[];

  @OneToMany(() => Account, (account) => account.accountType)
  accounts: Account[];

  // @ManyToOne(() => Mass, (mass) => mass.mass)
  // mass: Mass

  constructor(name: string, status: number) {
    this.name = name;
    //  this.massId=massId
    this.status = status;
  }
}
