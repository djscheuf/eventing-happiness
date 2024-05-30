import { expect, test, describe, beforeEach } from 'vitest'
import { Account } from '../models/account';
import { Database } from '../models/db';
import { Transaction } from '../models/transaction';
import { currentStateOf } from './current-state'



describe("Current State Of Account",()=>{
    let mockDb: Database;
    beforeEach(()=>{
        mockDb = {
            accounts:[],
            transactions:[],
        }
    });
    
    describe('Given Some Accounts',()=>{
        let aliceAcct: Account;
        let systemAcct: Account;
        beforeEach(()=>{
            systemAcct = {
                id: 0,
                name: "system"
            };
            mockDb.accounts.push(systemAcct);

            aliceAcct = {
                id: 1,
                name: "alice"
            };
            mockDb.accounts.push(aliceAcct);
        });
        describe('Given an init Transactions',()=>{
            const transactions: Transaction[] = [];
            let lastTransaction: number = 0;
            let startBal: number = 0;
            beforeEach(()=>{
                startBal = 10;
                mockDb.transactions.push({
                    when:lastTransaction,
                    transmitter:0,
                    receiver:1,
                    amount: startBal,
                });
            });
            describe('When get current account state for Alice',()=>{
                let result;
                beforeEach(()=>{
                        result = currentStateOf(aliceAcct.id,mockDb);
                });
                test('Then state only shows initial value',()=>{
                        expect(result).toBe(mockDb.transactions[0].amount);
                });
            });
            describe('Given some Debits',()=>{
                let debits: number = 0;
                beforeEach(()=>{
                    lastTransaction++;
                    let amt = 1;
                    debits +=amt;
                    mockDb.transactions.push({
                        when:lastTransaction,
                        transmitter:1,
                        receiver:0,
                        amount: amt,
                    });

                    lastTransaction++;
                    amt = 3;
                    debits += amt;
                    mockDb.transactions.push({
                        when:lastTransaction,
                        transmitter:1,
                        receiver:0,
                        amount: amt,
                    });
                });
                describe('When get current account state for Alice',()=>{
                    let result;
                    beforeEach(()=>{
                        result = currentStateOf(aliceAcct.id, mockDb);
                    });
                    test('Then state shows current value',()=>{
                        expect(result).toBe(startBal-debits);
                    });
                });
            });
        });
    });    
})