'use server'
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

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

export const getData = async () => {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();
    return {
        balance,
        transactions
    }
}