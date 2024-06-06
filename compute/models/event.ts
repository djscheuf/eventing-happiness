export type Event<T> = {
    type: EventType;
    when?: number;
    body: T;
}

export type EventType = 
    "OpenAccount"
    | "Transaction"
    | "Deposit";

export type OpenAccountBody = {
    name: string;
    initialBalance: number;
    //id: UUID;
    id: number;
}

export type OpenAccountEvent = Event<OpenAccountBody>;

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

export type SystemEvent = OpenAccountEvent | TransactionEvent | DepositEvent;