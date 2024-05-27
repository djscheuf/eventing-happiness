import { Account } from "./account";
import { Transaction } from "./transaction";

export type Database = {
  accounts: Account[];
  transactions: Transaction[];
};
