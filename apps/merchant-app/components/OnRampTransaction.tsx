"use client"
import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: { status: "Processing" | "Failure" | "Success" | undefined;
    provider: string;
    amount: number;
    startTime: Date;
    transactionType: "Credit" | "Debit" | undefined;
 }[]
}) => {
    if (!transactions || transactions.length === 0) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.reverse().map((t, index) => <div key={index}className="flex justify-between">
                <div>
                    <div className="text-sm">
                        {t.transactionType == 'Credit' ? `Received` : `Deposited`} INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.startTime.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    {t.transactionType == 'Credit' ? '+' : '-'} Rs {t.amount / 100}
                </div>
                <div className="font-semibold text-slate-400">
                    ({t.status})    
                </div>
            </div>)}
        </div>
    </Card>
}