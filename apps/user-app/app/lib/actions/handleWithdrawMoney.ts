'use server'
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import axios from "axios";

export default async function handleWithdrawMoney(amount : number, provider : string){

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const token = Math.random().toString();

    const fromUser = await prisma.user.findFirst({
        where: {
            id: userId
        }
    });
    if(!fromUser || fromUser?.balance < amount){
        return {
            message : "Insufficient Funds"
        }
    }
    console.log("check1");
    await prisma.onRampTransactions.create({
        data : {
            status : "Processing",
            token : token,
            provider : provider,
            amount : amount,
            startTime : new Date(),
            userId : userId
        }
    })

    try{
        const response = await axios.post(`${process.env.BANK_URL}/api/user/sendMoney`, {
            token,
            userId,
            amount
        });
        const updatedFromUser = await prisma.user.findFirst({
            where: {
                id: Number(userId)
            }
        });
        if(updatedFromUser)
            await prisma.balanceHistory.create({
                data : {
                    userId : Number(userId),
                    balance : updatedFromUser.balance,
                    timestamp : new Date()
                }
            })
        return {
            message : "On Ramp Transaction added"
        }
    }
    catch{
        return {
            message : "On Ramp Transaction not added"
        }
    }
}