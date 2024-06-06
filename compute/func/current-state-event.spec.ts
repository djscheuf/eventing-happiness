import {beforeEach, describe, test, expect} from 'vitest';
import { OpenAccountEvent, SystemEvent } from '../models/event';
import { currentStateOf } from './current-state-event';

describe('Current Account State from Event Stream',()=>{
    describe('Given an Event Stream',()=>{
        let stream: SystemEvent[] = [];

        describe('Given Some Open Accounts',()=>{
            let testAccountName = "alice";
            let testAccountInitBal = 19;
            beforeEach(()=>{
                stream.push(openAccountFor(testAccountName, testAccountInitBal));
                stream.push(openAccountFor("bob"));
            });
            describe('When get state of an Account',()=>{
                let result;
                beforeEach(()=>{
                     result = currentStateOf(1, stream)
                });
                test('Then Status reflects all Events for that Account',()=>{
                     expect(result).toBe(testAccountInitBal)
                });
            });
        });
        
    });    
});

function openAccountFor(name: string, initialBalance: number = 10): OpenAccountEvent {
    return {
        type:"OpenAccount",
        body: {
            name,
            initialBalance
        }
    }
}
