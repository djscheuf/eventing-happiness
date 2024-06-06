export type Event<T> = {
    type: EventType;
    when?: number;
    body: T;
}

export type EventType = 
    "OpenAccount"
    | "Transaction";

export type OpenAccountBody = {
    name: string;
    initialBalance: number;
    //id: UUID;
}
export type OpenAccountEvent = Event<OpenAccountBody>;

export type TransactionBody = {
    from: number;
    to: number;
    amount: number;
}
export type TransactionEvent = Event<TransactionBody>;

export type SystemEvent = OpenAccountEvent | TransactionEvent;