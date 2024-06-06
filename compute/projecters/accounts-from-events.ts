import { Account } from "../models/account";
import { OpenAccountBody, SystemEvent } from "../models/event";

export function accountsFrom(stream: SystemEvent[]): Account[]{
    const accountActivity = stream.filter(ForAccountAffectingEvents);

    let projectedAccounts:Account[] = [];
    accountActivity.forEach((event)=>{
        if(event.type == "OpenAccount")
            projectedAccounts.push({
                name: (event.body as OpenAccountBody).name,
                id: projectedAccounts.length+1,
                balance: (event.body as OpenAccountBody).initialBalance
            });
    });
    
    return projectedAccounts;
}


const ForAccountAffectingEvents = (x: SystemEvent): boolean => x.type === "OpenAccount";
