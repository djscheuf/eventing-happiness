import { SystemEvent, TransactionBody } from "../models/event";
import { accountsFrom } from "../projecters/accounts-from-events";

export function currentStateOf(account:number, stream:SystemEvent[]): number {
    const theAccount = accountsFrom(stream).find(x=> x.id == account);

    const [checkpoint, index] = findLast<SystemEvent>(stream, matchingCloseEvent(account) );

    const checkpointBalance = (checkpoint) 
        ? checkpoint.body["balance"]
        : theAccount?.balance ?? 0;

    const allRelevantActivity = stream
        .slice(index)
        .filter(ForActivity);    

    const allCredits = allRelevantActivity
        .filter(WhereReceiverIs(account))
        .map(ToTransactionAmount)
        .reduce(BySum,0);

    const allDebits = allRelevantActivity
        .filter(WhereSenderIs(account))
        .map(ToTransactionAmount)
        .reduce(BySum,0);
        
    return checkpointBalance + allCredits - allDebits;
}

const ForActivity = (x: SystemEvent): boolean => x.type === "Transaction" || x.type === "Deposit";

const WhereReceiverIs = (account: number) => (x: SystemEvent): boolean => x.body["to"] === account;
const WhereSenderIs = (account: number) => (x: SystemEvent): boolean => (x.body as TransactionBody).from === account;
const ToTransactionAmount = (x: SystemEvent) => (x.body as TransactionBody).amount;
const BySum = (left: number, right: number)=> left+right;

const matchingCloseEvent = (account: number) => (x: SystemEvent ) => x.type==="CloseBook" && x.body["id"] === account
function findLast<T>(stream: Array<T>, predicate: (element: T, idx: number ,arr: Array<T> ) => Boolean ): [result: T | undefined, index: number | undefined] {
    const length = stream.length;
    for(let i=length-1; i > 0; i--){
        if(predicate(stream[i],i,stream)) return [stream[i], i];
    }

    return [undefined,undefined];
}