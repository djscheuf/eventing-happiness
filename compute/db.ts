import { Database } from "./models/db";

export const db: Database = {
  accounts: [
    {
      id: 0,
      name: "system",
    },
    {
      id: 1,
      name: "alice",
    },
    {
      id: 2,
      name: "bob",
    },
    {
      id: 3,
      name: "charlie",
    },
  ],
  transactions: [
    {
      when: 0,
      transmitter: 0,
      receiver: 1,
      amount: 100.0,
      // system credits alice with 100$
    },
    {
      when: 1,
      transmitter: 0,
      receiver: 2,
      amount: 0.0,
      // system credits bob with 0$
    },
    {
      when: 2,
      transmitter: 1,
      receiver: 2,
      amount: 10.0,
      // alice credits bob 10$
    },
    {
      when: 3,
      transmitter: 1,
      receiver: 2,
      amount: 10.0,
      // alice credits bob 10$
    },
    {
      when: 4,
      transmitter: 3,
      receiver: 2,
      amount: -5.0,
      // charlie debits bob 5$
    },
  ],
};
