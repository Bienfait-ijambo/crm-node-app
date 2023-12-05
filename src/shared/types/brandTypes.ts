import { BrandType } from "./myTypes";

/**
 * Accounting code used in TFR table
 */
export type TfrAccount=BrandType<number,'Tfr account code'>

/**
 * accounting code used in journal,balance and bilan
 */
export type AccountingCode=BrandType<number,'Represent, ohada accounting code'>


export type AccountID = BrandType<number, 'OHADA Account ID' >;


export type AccountName = BrandType<string, 'OHADA Account Name'>;


export type AccountCODE = BrandType<number, 'OHADA Account Code : eg: 80,70,52'>;