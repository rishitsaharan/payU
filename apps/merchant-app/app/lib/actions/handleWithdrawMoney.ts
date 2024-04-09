
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import axios from "axios";

export default async function handleWithdrawMoney(amount : number, provider : string){

    const session = await getServerSession(authOptions);
    const merchantId = session?.user?.id;
    const token = Math.random().toString();

    const fromMerchant = await prisma.merchant.findFirst({
        where: {
            id: merchantId
        }
    });
    if(!fromMerchant || fromMerchant?.balance < amount){
        return {
            message : "Insufficient Funds"
        }
    }
    console.log("check1");
    await prisma.onRampTransactionsMerchant.create({
        data : {
            status : "Processing",
            token : token,
            provider : provider,
            amount : amount,
            startTime : new Date(),
            merchantId : merchantId,
            transactionType : "Debit"
        }
    })

    try{
        await axios.post(`http://localhost:3002/api/merchant/sendMoney`, {
            token,
            merchantId,
            amount
        });
        const updatedFromMerchant = await prisma.merchant.findFirst({
            where: {
                id: Number(merchantId)
            }
        });
        if(updatedFromMerchant)
            await prisma.balanceHistoryMerchant.create({
                data : {
                    merchantId : Number(merchantId),
                    balance : updatedFromMerchant.balance,
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