import {describe, test, expect, afterEach, beforeEach} from 'vitest';
import { SystemEvent } from '../models/event';
import { deposit, moveMoney, openAccountFor } from '../models/event-generators';
import { accountsFrom } from './accounts-from-events';

const ALICE = 1;
const BOB = 2;

describe('Get Accounts from a Stream',()=>{
    describe('Given an Event Stream',()=>{
        let stream: SystemEvent[] = [];

        afterEach(()=>{
            stream = [];
        })
        describe('Given some accounts, and activity',()=>{
            let accountNameAlice = "alice";
            let initialBalanceAlice = 19;
            let amountMovedFromAlice = 0;
            let accountNameBob = "bob";
            let initialBalanceBob = 19;
            let amountMovedToBob = 0;
            beforeEach(()=>{
                stream.push(openAccountFor(ALICE, accountNameAlice, initialBalanceAlice));
                stream.push(openAccountFor(BOB, accountNameBob,initialBalanceBob));

                const transaction1 = 5;
                stream.push(moveMoney(ALICE,BOB,transaction1))
                amountMovedFromAlice -= transaction1;
                amountMovedToBob +=transaction1;

                const depositAmt = 5;
                stream.push(deposit(ALICE,depositAmt))
                amountMovedFromAlice += depositAmt;
            });
            describe('When get Account From Strea,',()=>{
                let result;
                beforeEach(()=>{
                     result = accountsFrom(stream);
                });
                test('Then find correct number of accounts',()=>{
                     expect(result.length).toBe(2)
                });
                test('Then projected balance shows initial account balances',()=>{
                    const aliceAccount = result.find(x=>x.id=== ALICE);
                    expect(aliceAccount.balance).toBe(initialBalanceAlice);

                    const bobAccount = result.find(x=>x.id=== BOB);
                    expect(bobAccount.balance).toBe(initialBalanceBob);
                });
            });
        });
    });
});