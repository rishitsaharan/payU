'use client'

import { Card } from "@repo/ui/card"
import { getDashboardStats } from "../app/lib/actions/getDashboardStats"
import { useEffect, useState } from "react"

export const DashboardStats= () => {
    const [dashboardStats , setDashboardStats] = useState<{ numberBalanceHistory: number; numberOnRampTransactions: number;} | undefined>();
    useEffect(() => {
        getDashboardStats().then(response => setDashboardStats(response));
    }, [])
    return (
        <div className="grid grid-cols-1 gap-8">
            <div>
                <Card title="Total Number of transactions">
                    <div className=" text-9xl text-slate-800">
                        {dashboardStats?.numberBalanceHistory}
                    </div>
                </Card>
            </div>
            <div>
                <Card title="Number of Bank Transactions">
                    <div className="text-9xl text-slate-800">
                        {dashboardStats?.numberOnRampTransactions}
                    </div>
                </Card>
            </div>
        </div>
    )
}