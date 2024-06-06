import {beforeEach, describe, test, expect, afterEach} from 'vitest';
import { SystemEvent } from '../models/event';
import { currentStateOf } from './current-state-event';
import { openAccountFor, moveMoney, deposit, closeBookOn } from '../models/event-generators';

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
                stream.push(openAccountFor(BOB, "bob", 10));
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
                             expect(result).toBe(testAccountInitBal-moveAmt+depositAmt);
                        });
                    });
                });
                describe('Given some previous closedBooks',()=>{
                    const closedBalance = 42;
                    beforeEach(()=>{
                        stream.push(closeBookOn(ALICE,testAccountName,closedBalance));
                    });
                    describe('When get state of an Account',()=>{
                        let result;
                        beforeEach(()=>{
                             result = currentStateOf(ALICE,stream);
                        });
                        test('Then Status reflects the checkpoint',()=>{
                             expect(result).toBe(closedBalance);
                        });
                    });
                });
            });
        });
    });    
});

