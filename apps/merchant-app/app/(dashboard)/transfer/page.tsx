'use client'

import { AddMoney } from "../../../components/AddMoney"
import { OnRampTransactions } from "../../../components/OnRampTransaction"
import { SendMoney } from "../../../components/SendMoney"
import { useState, useEffect } from "react";
import { getOnRampTransactions } from "../../lib/actions/getOnRampTransactions";

export default function(){
    const [transactions, setTransactions] = useState<{ status: "Processing" | "Failure" | "Success";
        provider: string;
        amount: number;
        startTime: Date;
        transactionType: "Credit" | "Debit";
     }[]>([]);
    useEffect(() => {
        getOnRampTransactions().then(response => setTransactions(response))
    }, [])
    return (
        <div className="w-screen mt-4 flex flex-col">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <SendMoney />
                </div>
                <div>
                    <AddMoney />
                </div>
            </div>
            <div className="p-4">
                <OnRampTransactions transactions={transactions}/>
            </div>
        </div>
    )
}