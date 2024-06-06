import { CloseBookEvent, SystemEvent } from "../models/event";
import { accountsFrom } from "./accounts-from-events";
import { currentStateOf } from "../func/current-state-event";

export function createCloseBookEventFor(account: number, stream: SystemEvent[]): CloseBookEvent {
    const theAccount = accountsFrom(stream).find(x=> x.id == account);

    if(!theAccount){
        throw `Could not find Account #${account} in the stream. Please check your account number and try again.`;
    }

    const currentBalance = currentStateOf(account,stream);
    console.log(`currentBalance:${JSON.stringify(currentBalance)}`);
    

    return {
        type: "CloseBook",
        body: {
            id: theAccount?.id,
            name: theAccount?.name,
            balance: currentBalance,
            closeDate: new Date(),
        }
    }

}