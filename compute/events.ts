import { SystemEvent } from "./models/event";

export const eventStream: SystemEvent[] = [
    {
        when: 0,
        type: "OpenAccount",
        body: {
            name:"alice",
            initialBalance: 10.0,
        }
    },
    {
        when: 2,
        type: "OpenAccount",
        body: {
            name:"bob",
            initialBalance: 0.0,
        }
    },
    {
        when: 3,
        type: "Transaction",
        body: {
            from:1,
            to: 2,
            amount: 5.0,
        }
    },
];