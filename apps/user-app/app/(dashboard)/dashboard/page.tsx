'use client'

import BalanceGraph from "../../../components/BalanceGraph";
import { DashboardStats } from "../../../components/DashboardStats";

export default function() {
    return <div className="w-screen">
                <div className="text-4xl text-[#6a51a6] pt-8 mb-10 font-bold">
                    Dashboard
                </div>
                <div className="grid grid-cols-3 gap-4 ml-4 mr-4">
                    <div className=" col-span-2">
                        <BalanceGraph />
                    </div>
                    <div className=" col-span-1">
                        <div className="font-bold text-3xl m-3">
                            In Last 1 Month,
                        </div>
                        <DashboardStats />
                    </div>
                </div>
        </div>
}