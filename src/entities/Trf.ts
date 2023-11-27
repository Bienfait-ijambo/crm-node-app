import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from "typeorm";
import { TfrAccount } from "../shared/types/brandTypes";

export const TfrResultType = [
  { name: "MARGE_BRUTE", val: 1, code: 80 },
  { name: "VALEUR_AJOUTER", val: 2, code: 81 },
  { name: "RESULTAT_BRUT_D_EXPLOITATION", val: 3, code: 83 },
  { name: "RESULTAT_NET_D_EXPLOITATION", val: 4, code: 84 },
  { name: "RESULTAT_AVANT_CONTRIBUTION_SUR_BENEFICE", val: 5, code: 85 },
  { name: "RESULTAT_NET", val: 6, code: 13 },
] as const;

/**
 *
 * @param code
 * @returns {object} of name,code,val
 */
export function getTfrResultTypeByCode(
  code: TfrAccount
): { name: resultTypeNameType; code: TfrAccount; val: number } | undefined {
  const result = TfrResultType.filter((item) => item.code === code);
  if (result.length > 0) {
    return {
      name: result[0].name,
      code: result[0].code as TfrAccount,
      val: result[0].val,
    };
  }
  return;
}

export type resultTypeValType = (typeof TfrResultType)[number]["val"];

export type resultTypeNameType = (typeof TfrResultType)[number]["name"];

export type resultTypeCodeType = (typeof TfrResultType)[number]["code"];

/**
 * in french : vente marchandise
 */
export const SOLD_MERCHENDISE = 70;

/**
 * in french: stock - vendu
 */
export const SOLD_STOCK = 60;

/**
 * Tableau de formation de résultat
 *
 *
 * This table holds TfrResultAccountOperations
 */
@Entity()
export class Tfr {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account: number;

  /**
   * Journal Transaction Type
   * @{debit} or {credit}
   */
  @Column()
  transactionType: number;

  @Column()
  amount: string;

  /**
   *  ResultType reference : @{resultTypeNameType}
   */
  @Column()
  resultType: string;

  @Column()
  period: string;

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
    account: number,
    transactionType: number,
    resultType: resultTypeNameType,
    amount: string,
    period: string,
    userId: number
  ) {
    this.account = account;
    this.transactionType = transactionType;
    this.amount = amount;
    this.userId = userId;
    this.period = period;
    this.resultType = resultType;
  }
}
