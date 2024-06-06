import { Database } from "../models/db";

export function currentStateOf(accountId: number, dataset: Database){

    const theAccount = dataset.accounts.find(x=> x.id == accountId);
    
    const transactionsOnAccount = dataset.transactions.filter(x=> x.transmitter == accountId || x.receiver == accountId);

    const allCredits = transactionsOnAccount
        .filter(WhereReceiver(accountId))
        .map(ToTransactionAmount)
        .reduce(BySummation,0);
        
    const allDebits = transactionsOnAccount
        .filter(WhereSender(accountId))
        .map(ToTransactionAmount)
        .reduce(BySummation,0);

    return allCredits - allDebits;
}

const ToTransactionAmount = x => x.amount;
const BySummation = (left,right) => left+right;
const WhereReceiver = (accountId) => x => x.receiver == accountId
const WhereSender = (accountId) => x => x.transmitter == accountId