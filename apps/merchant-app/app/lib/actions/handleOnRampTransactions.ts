
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import axios from "axios";

export const handleOnRampTransactions = async (amount : number, provider : string) => {

    const session = await getServerSession(authOptions);
    const merchantId = session?.user?.id;
    const token = Math.random().toString();

    if(!merchantId){
        return {
            message : "User not logged in"
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
            merchantId : Number(merchantId),
            transactionType : "Credit"
        }
    })

    try{
        await axios.post(`${process.env.BANK_URL}/api/merchant/getMoney`, {
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
                    balance : updatedFromMerchant.balance + amount,
                    timestamp : new Date()
                }
            })
    }
    catch{
        try{
            await prisma.merchant.update({
              where : {
                id : Number(merchantId)
              },
              data : {
                lockedBalance : {
                  increment : Number(amount)
                }
              }
            })
          }
          catch(er){
            return {
                message : "On Ramp Transaction not added"
            }
          } 
    }
    return {
        message : "On Ramp Transaction added"
    }
}