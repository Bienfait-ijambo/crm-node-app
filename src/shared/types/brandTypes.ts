import { BrandType } from "./myTypes";

/**
 * Accounting code used in TFR table
 */
export type TfrAccount=BrandType<number,'Tfr account code'>

/**
 * accounting code used in journal,balance and bilan
 */
export type AccountingCode=BrandType<number,'Represent, ohada accounting code'>
