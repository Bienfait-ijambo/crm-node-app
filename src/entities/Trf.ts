import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Index,
} from "typeorm";

export const resultType = [
  { name: "MARGE_BRUTE", val: 1 },
  { name: "VALEUR_AJOUTER", val: 2 },
  { name: "RESULTAT_BRUT_D_EXPLOITATION", val: 3 },
  { name: "RESULTAT_NET_D_EXPLOITATION", val: 4 },
  { name: "RESULTAT_AVANT_CONTRIBUTION_SUR_BENEFICE", val: 5 },
  { name: "RESULTAT_NET", val: 6 },
] as const 

export type resultTypeInType=typeof resultType[number]['val']



/**
 * Tableau de formation de résultat
 */
@Entity()
export class Tfr {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountId: number;

  @Column()
  transactionType: number;

  @Column()
  resultType: number;

  @Column()
  amount: string;

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
    accountId: number,
    transactionType: number,
    resultType: number,
    amount: string,
    userId: number
  ) {
    this.accountId = accountId;
    this.transactionType = transactionType;
    this.amount = amount;
    this.userId = userId;
    this.resultType = resultType;
  }
}
