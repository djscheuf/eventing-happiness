export type Event<T> = {
    type: EventType;
    when?: number;
    body: T;
}

export type EventType = 
    "OpenAccount"
    | "Transaction"
    | "Deposit"
    | "CloseBook";

export type AccountBody = {
    name: string;
    balance: number;
    //id: UUID;
    id: number;
}

export type OpenAccountEvent = Event<AccountBody>;

export type TransactionBody = {
    from: number;
    to: number;
    amount: number;
}
export type TransactionEvent = Event<TransactionBody>;

export type DepositBody = {
    amount: number;
    //id: UUID;
    to: number;
}
export type DepositEvent = Event<DepositBody>;

export type CloseBookBody = AccountBody & {
    closeDate: Date;
}
export type CloseBookEvent = Event<CloseBookBody>;

export type SystemEvent = OpenAccountEvent | TransactionEvent | DepositEvent | CloseBookEvent;