import { CloseBookEvent, DepositEvent, OpenAccountEvent, TransactionEvent } from './event';

export function openAccountFor(id: number, name: string, initialBalance: number): OpenAccountEvent {
    return {
        type: "OpenAccount",
        body: {
            id,
            name,
            balance: initialBalance
        }
    };
}
export function moveMoney(from: number, to: number, amount: number): TransactionEvent {
    return {
        type: "Transaction",
        body: {
            from,
            to,
            amount
        }
    };
}
export function deposit(to: number, amount: number): DepositEvent {
    return {
        type: "Deposit",
        body: {
            to,
            amount
        }
    };
}

export function closeBookOn(id:number, name: string, balance: number): CloseBookEvent {
    return {
        type: "CloseBook",
        body: {
            id,
            name,
            balance,
            closeDate: new Date(),
        }
    }
}
