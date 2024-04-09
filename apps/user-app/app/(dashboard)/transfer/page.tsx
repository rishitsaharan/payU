
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { AddMoney } from "../../../components/AddMoney";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { useState, useEffect } from "react";
import { getData } from "../../lib/actions/getTransferData";

async function getBalance(){
    const session = await getServerSession(authOptions);
    
    const user = await prisma.user.findFirst({
        where : {
            id : Number(session?.user?.id)
        }
    });
    return {
        amount : user?.balance || 0,
        locked : user?.lockedBalance || 0
    }
}
async function getOnRampTransactions(){
    const session = await getServerSession(authOptions);
    const transactions = await prisma.onRampTransactions.findMany({
        where :{
            userId : Number(session?.user?.id)
        }
    });
    return transactions.map(t => ({
        time : t.startTime,
        status : t.status,
        amount : t.amount,
        provider : t.provider
    }))
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return(
        <div className=" w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Add Money From Bank
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <AddMoney/>
                </div>
                <div>
                    <BalanceCard amount={balance.amount} locked={balance.locked}/>
                    <div className="pt-4">
                        <OnRampTransactions transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    )
}