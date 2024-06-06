import { Account } from "../models/account";
import { AccountBody, SystemEvent } from "../models/event";

export function accountsFrom(stream: SystemEvent[]): Account[]{
    const accountActivity = stream.filter(ForAccountAffectingEvents);

    let projectedAccounts:Account[] = [];
    accountActivity.forEach((event)=>{
        if(event.type == "OpenAccount")
            projectedAccounts.push({
                name: (event.body as AccountBody).name,
                id: projectedAccounts.length+1,
                balance: (event.body as AccountBody).balance
            });
    });
    
    return projectedAccounts;
}


const ForAccountAffectingEvents = (x: SystemEvent): boolean => x.type === "OpenAccount";
