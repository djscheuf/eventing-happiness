import {beforeEach, describe, test, expect, afterEach} from 'vitest';
import { DepositEvent, OpenAccountEvent, SystemEvent, TransactionEvent } from '../models/event';
import { currentStateOf } from './current-state-event';

const ALICE = 1;
const BOB =2;

describe('Current Account State from Event Stream',()=>{
    describe('Given an Event Stream',()=>{
        let stream: SystemEvent[] = [];

        afterEach(()=>{
            stream = [];
        })

        describe('Given Some Open Accounts',()=>{
            let testAccountName = "alice";
            let testAccountInitBal = 19;
            beforeEach(()=>{
                stream.push(openAccountFor(ALICE, testAccountName, testAccountInitBal));
                stream.push(openAccountFor(BOB, "bob"));
            });
            describe('When get state of an Account',()=>{
                let result;
                beforeEach(()=>{
                     result = currentStateOf(ALICE, stream)
                });
                test('Then Status reflects all Events for that Account',()=>{
                     expect(result).toBe(testAccountInitBal)
                });
            });
            describe('Given some transactions',()=>{
                const moveAmt = Math.floor(testAccountInitBal/4);
                beforeEach(()=>{
                    stream.push(moveMoney(ALICE,BOB,moveAmt))
                });
                describe('When get state of an Account',()=>{
                    let result;
                    beforeEach(()=>{
                         result = currentStateOf(ALICE,stream);
                    });
                    test('Then Status accounts for transactions',()=>{
                         expect(result).toBe(testAccountInitBal-moveAmt);
                    });
                });
                describe('Given some Deposits',()=>{
                    const depositAmt = moveAmt + 1;
                    beforeEach(()=>{
                        stream.push(deposit(ALICE,depositAmt));
                    });
                    describe('When get state of an Account',()=>{
                        let result;
                        beforeEach(()=>{
                            console.log(`stream:${JSON.stringify(stream)}`);
                             result = currentStateOf(ALICE,stream);
                        });
                        test('Then Status accounts for all activity',()=>{
                             expect(result).toBe(testAccountInitBal-moveAmt);
                        });
                    });
                });
            });
        });
    });    
});

function openAccountFor(id: number, name: string, initialBalance: number = 10): OpenAccountEvent {
    return {
        type:"OpenAccount",
        body: {
            id,
            name,
            initialBalance
        }
    }
}

function moveMoney(from: number, to: number, amount: number): TransactionEvent {
    return {
        type: "Transaction",
        body: {
            from,
            to,
            amount
        }
    }
}

function deposit(to: number, amount: number): DepositEvent {
    return {
        type: "Deposit",
        body: {
            to,
            amount
        }
    }
}