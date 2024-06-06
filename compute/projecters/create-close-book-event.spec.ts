import {describe, test, expect, afterEach, beforeEach} from 'vitest';
import { SystemEvent } from '../models/event';
import { closeBookOn, deposit, moveMoney, openAccountFor } from '../models/event-generators';
import { createCloseBookEventFor } from './create-close-book-event';

const ALICE = 1;
const BOB =2;

describe('Create CloseBooks Event for an account',()=>{
    describe('Given an Event Stream',()=>{
        let stream: SystemEvent[] = [];

        afterEach(()=>{
            stream = [];
        })
        describe('Given some accounts, and activity',()=>{
            let accountNameAlice = "alice";
            let initialBalanceAlice = 19;
            let amountMovedFromAlice = 0;
            beforeEach(()=>{
                stream.push(openAccountFor(ALICE, accountNameAlice, initialBalanceAlice));
                stream.push(openAccountFor(BOB, "bob",10));

                const transaction1 = 5;
                stream.push(moveMoney(ALICE,BOB,transaction1))
                amountMovedFromAlice -= transaction1;

                const transaction2 = 3;
                stream.push(moveMoney(ALICE,BOB,transaction2))
                amountMovedFromAlice -= transaction2;

                const transaction3 = 1;
                stream.push(moveMoney(BOB,ALICE,transaction3))
                amountMovedFromAlice += transaction3;

                const depositAmt = 5;
                stream.push(deposit(ALICE,depositAmt))
                amountMovedFromAlice += depositAmt;
            });
            describe('When close books for account on current stream',()=>{
                let result;
                beforeEach(()=>{
                     result = createCloseBookEventFor(ALICE,stream);
                });
                test('Then created Event properly reflects final state of the account',()=>{
                    console.log(`testAccountInitBal:${JSON.stringify(initialBalanceAlice)}`);
                    console.log(`amountMovedFromAlice:${JSON.stringify(amountMovedFromAlice)}`);
                    
                     expect(result.body.balance).toBe(initialBalanceAlice+amountMovedFromAlice);
                });
            });
            describe('Given some previous closedBooks',()=>{
                let closedBalance = 42;
                beforeEach(()=>{
                    stream.push(closeBookOn(ALICE,accountNameAlice, closedBalance));
                });
                describe('When close books for account on current stream',()=>{
                    let result;
                    beforeEach(()=>{
                         result = createCloseBookEventFor(ALICE,stream);
                    });
                    test('Then created Event reflects latest checkpoint',()=>{
                         expect(result.body.balance).toBe(closedBalance);
                    });
                });
            });
        });
    });
});