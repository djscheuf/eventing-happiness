import { SystemEvent, TransactionBody } from "../models/event";
import { accountsFrom } from "../projecters/accounts-from-events";

export function currentStateOf(account:number, stream:SystemEvent[]): number {
    const theAccount = accountsFrom(stream).find(x=> x.id == account);
    const allTransactions = stream.filter(ForTransactions);    

    const allCredits = allTransactions
        .filter(WhereReceiverIs(account))
        .map(ToTransactionAmount)
        .reduce(BySum,0);

    const allDebits = allTransactions
        .filter(WhereSenderIs(account))
        .map(ToTransactionAmount)
        .reduce(BySum,0);
        
    return (theAccount?.balance ?? 0) + allCredits - allDebits;
}

const ForTransactions = (x: SystemEvent): boolean => x.type === "Transaction";

const WhereReceiverIs = (account: number) => (x: SystemEvent): boolean => (x.body as TransactionBody).to === account;
const WhereSenderIs = (account: number) => (x: SystemEvent): boolean => (x.body as TransactionBody).from === account;
const ToTransactionAmount = (x: SystemEvent) => (x.body as TransactionBody).amount;
const BySum = (left: number, right: number)=> left+right;