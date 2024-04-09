'use client'

import { useState } from "react";
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textInput";
import { handleDuesMerchant } from "../app/lib/actions/handleDuesMerchant";

export const User = ({user, index} : {user : { number: string; id: number; name: string | null; }, index : any}) => {
    const [deposit, setDeposit] = useState(false);
    const [amount, setAmount] = useState(0);
    const handleAmount = (amount : string) => {
        setAmount(Number(amount));
    }
    
    return (
        <div key={index} className="flex justify-between items-center px-4 py-2 mt-2 h-24">
            <div className="flex flex-col justify-center">
                <div className=" font-semibold">{user.name ? user.name : "Mr./Mrs. Anonymous"}</div>
                <div className=" text-slate-500">{user.number}</div>
            </div>
            {!deposit && <div className="flex flex-row  justify-center max-h-10">
                <Button onClick={() => {setDeposit(!deposit)}}>
                    Deposit
                </Button>
            </div>}
            {deposit && <div>
                <div className="flex flex-row  justify-center items-center">
                    <div className="flex justify-center items-center mr-4">
                        <TextInput label="Enter Amount" placeholder="100" onChange={handleAmount}/>
                    </div>
                    <div className="flex flex-row  justify-center items-center max-h-10">
                        <Button onClick={async () => {
                            if(amount != 0)
                                await handleDuesMerchant(amount*100, user);
                            setDeposit(!deposit)
                        }}>
                            Send
                        </Button>
                    </div>
                </div>
            </div>}
        </div>
    )
}